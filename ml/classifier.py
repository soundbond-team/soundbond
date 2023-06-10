# First steps

### imports
import os

os.environ["PYTORCH_CUDA_ALLOC_CONF"] = "max_split_size_mb:128"
import gc
import os
import pickle
import random
import time
from collections import Counter, defaultdict
from functools import partial
from pathlib import Path

import librosa
import numpy as np
import pandas as pd
import torch
import torch.nn as nn
import torch.nn.functional as F
from decouple import config
from fastprogress import master_bar, progress_bar

# Predict function
from matplotlib import pyplot as plt
from PIL import Image
from preprocessor import convert_wav_to_image, save_as_pkl_binary
from psutil import cpu_count
from sklearn.model_selection import train_test_split
from torch.optim import Adam
from torch.optim.lr_scheduler import CosineAnnealingLR
from torch.utils.data import DataLoader, Dataset
from torchvision.transforms import transforms

# from skmultilearn.model_selection import iterative_train_test_split

weight_best_path = config("WEIGHT_BEST_PATH")

torch.cuda.is_available()
torch.cuda.list_gpu_processes()
### utils
def seed_everything(seed):
    random.seed(seed)
    os.environ["PYTHONHASHSEED"] = str(seed)
    np.random.seed(seed)
    torch.manual_seed(seed)
    torch.cuda.manual_seed(seed)
    torch.backends.cudnn.deterministic = True


SEED = 2019
seed_everything(SEED)
N_JOBS = 2  # cpu_count()
print(N_JOBS)
os.environ["MKL_NUM_THREADS"] = str(N_JOBS)
os.environ["OMP_NUM_THREADS"] = str(N_JOBS)
DataLoader = partial(DataLoader, num_workers=N_JOBS)
# from official code https://colab.research.google.com/drive/1AgPdhSp7ttY18O3fEoHOQKlt_3HJDLi8#scrollTo=cRCaCIb9oguU
def _one_sample_positive_class_precisions(scores, truth):
    """Calculate precisions for each true class for a single sample.

    Args:
      scores: np.array of (num_classes,) giving the individual classifier scores.
      truth: np.array of (num_classes,) bools indicating which classes are true.

    Returns:
      pos_class_indices: np.array of indices of the true classes for this sample.
      pos_class_precisions: np.array of precisions corresponding to each of those
        classes.
    """
    num_classes = scores.shape[0]
    pos_class_indices = np.flatnonzero(truth > 0)
    # Only calculate precisions if there are some true classes.
    if not len(pos_class_indices):
        return pos_class_indices, np.zeros(0)
    # Retrieval list of classes for this sample.
    retrieved_classes = np.argsort(scores)[::-1]
    # class_rankings[top_scoring_class_index] == 0 etc.
    class_rankings = np.zeros(num_classes, dtype=np.int)
    class_rankings[retrieved_classes] = range(num_classes)
    # Which of these is a true label?
    retrieved_class_true = np.zeros(num_classes, dtype=np.bool)
    retrieved_class_true[class_rankings[pos_class_indices]] = True
    # Num hits for every truncated retrieval list.
    retrieved_cumulative_hits = np.cumsum(retrieved_class_true)
    # Precision of retrieval list truncated at each hit, in order of pos_labels.
    precision_at_hits = retrieved_cumulative_hits[class_rankings[pos_class_indices]] / (
        1 + class_rankings[pos_class_indices].astype(np.float)
    )
    return pos_class_indices, precision_at_hits


def calculate_per_class_lwlrap(truth, scores):
    """Calculate label-weighted label-ranking average precision.

    Arguments:
      truth: np.array of (num_samples, num_classes) giving boolean ground-truth
        of presence of that class in that sample.
      scores: np.array of (num_samples, num_classes) giving the classifier-under-
        test's real-valued score for each class for each sample.

    Returns:
      per_class_lwlrap: np.array of (num_classes,) giving the lwlrap for each
        class.
      weight_per_class: np.array of (num_classes,) giving the prior of each
        class within the truth labels.  Then the overall unbalanced lwlrap is
        simply np.sum(per_class_lwlrap * weight_per_class)
    """
    assert truth.shape == scores.shape
    num_samples, num_classes = scores.shape
    # Space to store a distinct precision value for each class on each sample.
    # Only the classes that are true for each sample will be filled in.
    precisions_for_samples_by_classes = np.zeros((num_samples, num_classes))
    for sample_num in range(num_samples):
        pos_class_indices, precision_at_hits = _one_sample_positive_class_precisions(
            scores[sample_num, :], truth[sample_num, :]
        )
        precisions_for_samples_by_classes[
            sample_num, pos_class_indices
        ] = precision_at_hits
    labels_per_class = np.sum(truth > 0, axis=0)
    weight_per_class = labels_per_class / float(np.sum(labels_per_class))
    # Form average of each column, i.e. all the precisions assigned to labels in
    # a particular class.
    per_class_lwlrap = np.sum(precisions_for_samples_by_classes, axis=0) / np.maximum(
        1, labels_per_class
    )
    # overall_lwlrap = simple average of all the actual per-class, per-sample precisions
    #                = np.sum(precisions_for_samples_by_classes) / np.sum(precisions_for_samples_by_classes > 0)
    #           also = weighted mean of per-class lwlraps, weighted by class label prior across samples
    #                = np.sum(per_class_lwlrap * weight_per_class)
    return per_class_lwlrap, weight_per_class


### dataset
dataset_dir = Path(config("DATASET_DIR"))
preprocessed_dir = Path(config("PREPROCESSED_DIR"))
csvs = {
    "train_curated": dataset_dir / "train_curated.csv",
    #'train_noisy': dataset_dir / 'train_noisy.csv',
    "train_noisy": preprocessed_dir / "trn_noisy_best50s.csv",
    "sample_submission": dataset_dir / "sample_submission.csv",
}

dataset = {
    "train_curated": dataset_dir / "train_curated",
    "train_noisy": dataset_dir / "train_noisy",
    "test": dataset_dir / "test",
}

mels = {
    "train_curated": preprocessed_dir / "mels_train_curated.pkl",
    "train_noisy": preprocessed_dir / "mels_trn_noisy_best50s.pkl",
    "test": preprocessed_dir / "mels_test.pkl",
}
train_curated = pd.read_csv(csvs["train_curated"])
train_noisy = pd.read_csv(csvs["train_noisy"])
train_df = pd.concat([train_curated, train_noisy], sort=True, ignore_index=True)
train_df.head()
test_df = pd.read_csv(csvs["sample_submission"])
test_df.head()
labels = test_df.columns[1:].tolist()
labels
num_classes = len(labels)
num_classes
y_train = np.zeros((len(train_df), num_classes)).astype(int)
for i, row in enumerate(train_df["labels"].str.split(",")):
    for label in row:
        idx = labels.index(label)
        y_train[i, idx] = 1

y_train.shape
with open(mels["train_curated"], "rb") as curated, open(
    mels["train_noisy"], "rb"
) as noisy:
    x_train = pickle.load(curated)
    x_train.extend(pickle.load(noisy))

with open(mels["test"], "rb") as test:
    x_test = pickle.load(test)

len(x_train), len(x_test)


class FATTrainDataset(Dataset):
    def __init__(self, mels, labels, transforms):
        super().__init__()
        self.mels = mels
        self.labels = labels
        self.transforms = transforms

    def __len__(self):
        return len(self.mels)

    def __getitem__(self, idx):
        # crop 1sec
        image = Image.fromarray(self.mels[idx], mode="RGB")
        time_dim, base_dim = image.size
        crop = random.randint(0, time_dim - base_dim)
        image = image.crop([crop, 0, crop + base_dim, base_dim])
        image = self.transforms(image).div_(255)

        label = self.labels[idx]
        label = torch.from_numpy(label).float()

        return image, label


class FATTestDataset(Dataset):
    def __init__(self, fnames, mels, transforms, tta=5):
        logfile = open("test.log", "w")
        super().__init__()
        self.fnames = fnames
        self.mels = mels
        self.transforms = transforms
        self.tta = tta  # test time augmentation, which means we will predict 5 times for each sample
        logfile.write(
            f"len(fnames) = {len(fnames)}, len(mels) = {len(mels)}, tta = {tta}"
        )
        logfile.write(
            f"FATTestDataset with params: fnames = {fnames}, mels = {mels}, transforms = {transforms}, tta = {tta}"
        )

    def __len__(self):
        return len(self.fnames) * self.tta

    def __getitem__(self, idx):
        print(f"Attemping to get item {idx}")
        new_idx = idx % len(self.fnames)

        image = Image.fromarray(self.mels[new_idx], mode="RGB")
        time_dim, base_dim = image.size
        crop = random.randint(0, time_dim - base_dim)
        image = image.crop([crop, 0, crop + base_dim, base_dim])
        image = self.transforms(image).div_(255)

        fname = self.fnames[new_idx]

        return image, fname
        # This is taking a huge amount of ram. Let's refactor:


transforms_dict = {
    "train": transforms.Compose(
        [
            transforms.RandomHorizontalFlip(0.5),
            transforms.ToTensor(),
        ]
    ),
    "test": transforms.Compose(
        [
            transforms.RandomHorizontalFlip(0.5),
            transforms.ToTensor(),
        ]
    ),
}
### model
class ConvBlock(nn.Module):
    def __init__(self, in_channels, out_channels):
        super().__init__()

        self.conv1 = nn.Sequential(
            nn.Conv2d(in_channels, out_channels, 3, 1, 1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(),
        )
        self.conv2 = nn.Sequential(
            nn.Conv2d(out_channels, out_channels, 3, 1, 1),
            nn.BatchNorm2d(out_channels),
            nn.ReLU(),
        )

        self._init_weights()

    def _init_weights(self):
        for m in self.modules():
            if isinstance(m, nn.Conv2d):
                nn.init.kaiming_normal_(m.weight)
                if m.bias is not None:
                    nn.init.zeros_(m.bias)
            elif isinstance(m, nn.BatchNorm2d):
                nn.init.constant_(m.weight, 1)
                nn.init.zeros_(m.bias)

    def forward(self, x):
        x = self.conv1(x)
        x = self.conv2(x)
        x = F.avg_pool2d(x, 2)
        return x


class Classifier(nn.Module):
    def __init__(self, num_classes):
        super().__init__()

        self.conv = nn.Sequential(
            ConvBlock(in_channels=3, out_channels=64),
            ConvBlock(in_channels=64, out_channels=128),
            ConvBlock(in_channels=128, out_channels=256),
            ConvBlock(in_channels=256, out_channels=512),
        )

        self.fc = nn.Sequential(
            nn.Dropout(0.2),
            nn.Linear(512, 128),
            nn.PReLU(),
            nn.BatchNorm1d(128),
            nn.Dropout(0.1),
            nn.Linear(128, num_classes),
        )

    def forward(self, x):
        x = self.conv(x)
        x = torch.mean(x, dim=3)
        x, _ = torch.max(x, dim=2)
        x = self.fc(x)
        return x


Classifier(num_classes=num_classes)
### train
def train_model(x_train, y_train, train_transforms):
    num_epochs = 80  # number epoch to train, epochs are defined as one pass over all the training data
    #!batch_size = 64 # training batch size, i.e. how many training samples to work through before updating the weights
    batch_size = 32  # training batch size, i.e. how many training samples to work through before updating the weights
    test_batch_size = 32  # testing batch size, i.e. how many testing samples to work through before updating the weights
    lr = 3e-3  # learning rate
    eta_min = 1e-5  # minimum learning rate
    t_max = 10  # number of epochs with constant learning rate

    num_classes = y_train.shape[1]

    x_trn, x_val, y_trn, y_val = train_test_split(
        x_train, y_train, test_size=0.2, random_state=SEED
    )

    train_dataset = FATTrainDataset(x_trn, y_trn, train_transforms)
    valid_dataset = FATTrainDataset(x_val, y_val, train_transforms)

    train_loader = DataLoader(train_dataset, batch_size=batch_size, shuffle=True)
    valid_loader = DataLoader(valid_dataset, batch_size=test_batch_size, shuffle=False)

    model = Classifier(num_classes=num_classes).cuda()
    criterion = nn.BCEWithLogitsLoss().cuda()
    optimizer = Adam(params=model.parameters(), lr=lr, amsgrad=False)
    scheduler = CosineAnnealingLR(optimizer, T_max=t_max, eta_min=eta_min)

    best_epoch = -1
    best_lwlrap = 0.0
    mb = master_bar(range(num_epochs))

    for epoch in mb:
        start_time = time.time()
        model.train()
        avg_loss = 0.0

        for x_batch, y_batch in progress_bar(train_loader, parent=mb):
            preds = model(x_batch.cuda())
            loss = criterion(preds, y_batch.cuda())

            optimizer.zero_grad()
            loss.backward()
            optimizer.step()

            avg_loss += loss.item() / len(train_loader)

        model.eval()
        valid_preds = np.zeros((len(x_val), num_classes))
        avg_val_loss = 0.0

        for i, (x_batch, y_batch) in enumerate(valid_loader):
            preds = model(
                x_batch.cuda()
            ).detach()  # no need to track gradients for validation
            loss = criterion(preds, y_batch.cuda())

            preds = torch.sigmoid(preds)
            valid_preds[
                i * test_batch_size : (i + 1) * test_batch_size
            ] = preds.cpu().numpy()

            avg_val_loss += loss.item() / len(valid_loader)

        score, weight = calculate_per_class_lwlrap(y_val, valid_preds)
        lwlrap = (score * weight).sum()

        scheduler.step()

        if (epoch + 1) % 5 == 0:
            elapsed = time.time() - start_time
            mb.write(
                f"Epoch {epoch+1} - avg_train_loss: {avg_loss:.4f}  avg_val_loss: {avg_val_loss:.4f}  val_lwlrap: {lwlrap:.6f}  time: {elapsed:.0f}s"
            )

        if lwlrap > best_lwlrap:
            best_epoch = epoch + 1
            best_lwlrap = lwlrap
            torch.save(model.state_dict(), "weight_best.pt")

    del model  # https://stackoverflow.com/questions/70174653/how-to-clean-garbage-from-cuda-in-pytorch
    torch.cuda.empty_cache()
    return {
        "best_epoch": best_epoch,
        "best_lwlrap": best_lwlrap,
    }


# result = train_model(x_train, y_train, transforms_dict['train'])
# result
### predict


import gc


def predict_model(test_fnames, x_test, test_transforms, num_classes, *, tta=5):
    batch_size = 32  # testing batch size, i.e. how many testing samples to work through before updating the weights
    #!256

    # let's try with 1/4 of the test data
    # x_test = x_test[:len(x_test)//10]
    # test_fnames = test_fnames[:len(test_fnames)//10]

    test_dataset = FATTestDataset(test_fnames, x_test, test_transforms, tta=tta)
    # FATTestDataset args : fnames, mels, transforms, tta
    test_loader = DataLoader(test_dataset, batch_size=batch_size, shuffle=False)

    print("Instantiating model...")

    model = Classifier(num_classes=num_classes)
    model.load_state_dict(torch.load(weight_best_path))
    model.cuda()
    model.eval()

    all_outputs, all_fnames = [], []

    # pb = progress_bar(test_loader)
    print(f"Predicting {len(test_fnames)} samples...")
    print(f"Batch size: {batch_size}")
    print(f"Number of batches: {len(test_loader)}")
    print(f"Number of samples: {len(test_loader) * batch_size}")

    nb = 0

    for images, fnames in test_loader:  # pb:
        nb += 1

        print(f"Predicting {fnames}")
        preds = torch.sigmoid(model(images.cuda()).detach())
        all_outputs.append(preds.cpu().numpy())
        all_fnames.extend(fnames)
        print(f"Predicted {len(all_fnames)} of {len(test_fnames)}")
        # collect garbage every 100 batches
        del images, preds

        if len(all_fnames) % (batch_size * 100) == 0:
            gc.collect()

    print(nb)

    print("Done predicting")
    test_preds = pd.DataFrame(
        data=np.concatenate(all_outputs),
        index=all_fnames,
        columns=map(str, range(num_classes)),
    )
    test_preds = test_preds.groupby(level=0).mean()

    return test_preds


def report_gpu():
    print(torch.cuda.list_gpu_processes())
    gc.collect()
    torch.cuda.empty_cache()


if __name__ == "__main__":
    print(f"len x_test: {len(x_test)}")

    test_preds = predict_model(
        test_df["fname"], x_test, transforms_dict["test"], num_classes, tta=20
    )
    import gc

    # report_gpu()
    test_df[labels] = test_preds.values
    test_df.to_csv("submission.csv", index=False)
    test_df.head()

    # load submission.csv
    sub = pd.read_csv("submission.csv")

    # get the top 3 predictions for the first 10 samples
    for i in range(10):
        print(f"Sample {i+1} {sub.iloc[i, 0]}")
        print(sub.iloc[i, 1:].sort_values(ascending=False)[:3])
        print()

# Let's just wrap this up in a function
def predict_file(file_name, source_folder=Path("./")):
    # We need to create a dataframe with the file name as 'fname'
    df = pd.DataFrame([file_name], columns=["fname"])

    # Let's define the sampling rate
    SR = librosa.get_samplerate(source_folder / file_name)
    # Let's print the sampling rate
    print(f"Sampling rate: {SR}")

    # Let's generate Mel using preprocessor
    mels = convert_wav_to_image(df, source=source_folder)

    # Let's get the first Mel
    mel = mels[0]

    # Now, we save it so it can be used in the model
    save_as_pkl_binary(mel, "mel.pkl")

    file_preds = predict_model(
        [file_name], mels, transforms_dict["test"], num_classes, tta=20
    )

    # Real labels are from test_preds.values. Let's change the index to the labels
    file_preds.columns = labels

    # Let's get the top 3 predictions, with real labels
    top_3 = file_preds.iloc[0, :].sort_values(ascending=False)[:3].index.values

    # Let's plot the Mel
    plt.imshow(mel)

    # Let's plot the Mel with the top 3 predictions
    plt.imshow(mel)
    plt.title(f"Top 3 predictions: {top_3}")

    return top_3
