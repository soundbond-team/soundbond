from utils import import_data
import pandas as pd

dataset_path = "le_path_du_dossier_data"

dataset_version_F = "fake"

fake_dataset = import_data(dataset_path, dataset_version_F)

dataset_version_A = "automated"

automated_dataset = import_data(dataset_path, dataset_version_A)

print(automated_dataset)
print(fake_dataset)
