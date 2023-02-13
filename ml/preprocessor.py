# Code to create FAT2019 Preprocessed Mel-spectrogram Dataset

import os
import pickle
from pathlib import Path

import IPython
import IPython.display
import matplotlib.pyplot as plt
import numpy as np  # linear algebra
import pandas as pd  # data processing, CSV file I/O (e.g. pd.read_csv)
import PIL
import torch
import torch.nn as nn
import torch.nn.functional as F
from decouple import config
from tqdm import tqdm_notebook

# Input data files are available in the "../input/" directory.
# For example, running this (by clicking run or pressing Shift+Enter) will list the files in the input directory


# Any results you write to the current directory are saved as output.
print(config("DATASET_DIR"))
DATA = Path(config("DATASET_DIR"))
PREPROCESSED = Path(config("PREPROCESSED_DIR"))
# PREPROCESSED = Path('work/fat2019_prep_mels1')
WORK = Path("work")
Path(PREPROCESSED).mkdir(exist_ok=True, parents=True)
Path(WORK).mkdir(exist_ok=True, parents=True)

CSV_TRN_CURATED = DATA / "train_curated.csv"
CSV_TRN_NOISY = DATA / "train_noisy.csv"
CSV_SUBMISSION = DATA / "sample_submission.csv"

TRN_CURATED = DATA / "train_curated"
TRN_NOISY = DATA / "train_noisy"
TEST = DATA / "test"

MELS_TRN_CURATED = PREPROCESSED / "mels_train_curated.pkl"
MELS_TRN_NOISY = PREPROCESSED / "mels_train_noisy.pkl"
MELS_TEST = PREPROCESSED / "mels_test.pkl"

CSV_TRN_NOISY_BEST50S = PREPROCESSED / "trn_noisy_best50s.csv"
MELS_TRN_NOISY_BEST50S = PREPROCESSED / "mels_trn_noisy_best50s.pkl"

trn_curated_df = pd.read_csv(CSV_TRN_CURATED)
trn_noisy_df = pd.read_csv(CSV_TRN_NOISY)
test_df = pd.read_csv(CSV_SUBMISSION)
import random

import librosa
import librosa.display
from fastai import *
from fastai.callback import *
from fastai.vision import *
from fastai.vision.data import *


def read_audio(conf, pathname, trim_long_data):
    y, sr = librosa.load(pathname, sr=conf.sampling_rate)
    # trim silence
    if 0 < len(y):  # workaround: 0 length causes error
        y, _ = librosa.effects.trim(y)  # trim, top_db=default(60)
    # make it unified length to conf.samples
    if len(y) > conf.samples:  # long enough
        if trim_long_data:
            y = y[0 : 0 + conf.samples]
    else:  # pad blank
        padding = conf.samples - len(y)  # add padding at both ends
        offset = padding // 2
        y = np.pad(y, (offset, conf.samples - len(y) - offset), conf.padmode)
    return y


def audio_to_melspectrogram(conf, audio):
    spectrogram = librosa.feature.melspectrogram(
        audio,
        sr=conf.sampling_rate,
        n_mels=conf.n_mels,
        hop_length=conf.hop_length,
        n_fft=conf.n_fft,
        fmin=conf.fmin,
        fmax=conf.fmax,
    )
    spectrogram = librosa.power_to_db(spectrogram)
    spectrogram = spectrogram.astype(np.float32)
    return spectrogram


def show_melspectrogram(conf, mels, title="Log-frequency power spectrogram"):
    librosa.display.specshow(
        mels,
        x_axis="time",
        y_axis="mel",
        sr=conf.sampling_rate,
        hop_length=conf.hop_length,
        fmin=conf.fmin,
        fmax=conf.fmax,
    )
    plt.colorbar(format="%+2.0f dB")
    plt.title(title)
    plt.show()


def read_as_melspectrogram(conf, pathname, trim_long_data, debug_display=False):
    x = read_audio(conf, pathname, trim_long_data)
    mels = audio_to_melspectrogram(conf, x)
    if debug_display:
        IPython.display.display(IPython.display.Audio(x, rate=conf.sampling_rate))
        show_melspectrogram(conf, mels)
    return mels


class conf:
    sampling_rate = 44100
    duration = 2  # sec
    hop_length = 347 * duration  # to make time steps 128
    fmin = 20
    fmax = sampling_rate // 2
    n_mels = 128
    n_fft = n_mels * 20
    padmode = "constant"
    samples = sampling_rate * duration


def get_default_conf():
    return conf


def set_fastai_random_seed(seed=42):
    # https://docs.fast.ai/dev/test.html#getting-reproducible-results

    # python RNG
    random.seed(seed)

    # pytorch RNGs
    import torch

    torch.manual_seed(seed)
    torch.backends.cudnn.deterministic = True
    if torch.cuda.is_available():
        torch.cuda.manual_seed_all(seed)

    # numpy RNG
    import numpy as np

    np.random.seed(seed)


def mono_to_color(X, mean=None, std=None, norm_max=None, norm_min=None, eps=1e-6):
    # Stack X as [X,X,X]
    X = np.stack([X, X, X], axis=-1)

    # Standardize
    mean = mean or X.mean()
    X = X - mean
    std = std or X.std()
    Xstd = X / (std + eps)
    _min, _max = Xstd.min(), Xstd.max()
    norm_max = norm_max or _max
    norm_min = norm_min or _min
    if (_max - _min) > eps:
        # Normalize to [0, 255]
        V = Xstd
        V[V < norm_min] = norm_min
        V[V > norm_max] = norm_max
        V = 255 * (V - norm_min) / (norm_max - norm_min)
        V = V.astype(np.uint8)
    else:
        # Just zero
        V = np.zeros_like(Xstd, dtype=np.uint8)
    return V


def convert_wav_to_image(df, source):
    X = []
    for i, row in tqdm_notebook(df.iterrows()):
        x = read_as_melspectrogram(conf, source / str(row.fname), trim_long_data=False)
        x_color = mono_to_color(x)
        X.append(x_color)
    return X


def save_as_pkl_binary(obj, filename):
    """Save object as pickle binary file.
    Thanks to https://stackoverflow.com/questions/19201290/how-to-save-a-dictionary-to-a-file/32216025
    """
    with open(filename, "wb") as f:
        pickle.dump(obj, f, pickle.HIGHEST_PROTOCOL)


def load_pkl(filename):
    """Load pickle object from file."""
    with open(filename, "rb") as f:
        return pickle.load(f)


conf = get_default_conf()


def convert_dataset(df, source_folder, filename):
    X = convert_wav_to_image(df, source=source_folder)
    save_as_pkl_binary(X, filename)
    print(f"Created {filename}")
    return X
