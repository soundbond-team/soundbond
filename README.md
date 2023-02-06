# SoundBond

[![Build](https://github.com/gu1lhem/soundbond/actions/workflows/ci.yml/badge.svg)](https://github.com/gu1lhem/soundbond/actions/workflows/ci.yml)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/gu1lhem/soundbond)
![GitHub repo size](https://img.shields.io/github/repo-size/gu1lhem/soundbond)
[![Coverage](https://sonarcloud.io/api/project_badges/measure?project=gu1lhem_soundbond&metric=coverage)](https://sonarcloud.io/dashboard?id=gu1lhem_soundbond)
[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=gu1lhem_soundbond&metric=alert_status)](https://sonarcloud.io/dashboard?id=gu1lhem_soundbond)
[![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=gu1lhem_soundbond&metric=code_smells)](https://sonarcloud.io/dashboard?id=gu1lhem_soundbond)
[![Maintainability Rating](https://sonarcloud.io/api/project_badges/measure?project=gu1lhem_soundbond&metric=sqale_rating)](https://sonarcloud.io/dashboard?id=gu1lhem_soundbond)
[![Security Rating](https://sonarcloud.io/api/project_badges/measure?project=gu1lhem_soundbond&metric=security_rating)](https://sonarcloud.io/dashboard?id=gu1lhem_soundbond)
[![Technical Debt](https://sonarcloud.io/api/project_badges/measure?project=gu1lhem_soundbond&metric=sqale_index)](https://sonarcloud.io/dashboard?id=gu1lhem_soundbond)

## A propos

**SoundBond** est un projet de réseau social basé sur le son. Figurez-vous le comme un Instagram des sons. Tous droits réservés.
[Documentation en ligne du projet](https://gu1lhem.github.io/soundbond/)

### Intégration continue

Pour notre intégration continue, nous utilisons [GitHub Actions](https://fr.github.com/features/actions). Les tests sont effectés au moins avant chaque _release_ (lors de _commits_ et _merge_ sur les branches _main_ et _develop_).

### Kanban client

Notre kanban client est disponible [sur Jira](https://soundbond.atlassian.net/jira/software/c/projects/CS/boards/4).

## Pré-requis

Avant de commencer, assurez-vous de satisfaire les pré-requis suivants :

- Vous avez une machine avec `Windows/Linux Ubuntu`. Le fonctionnement avec un autre OS n'est pas garanti.
- Vous avez installé [NodeJS](https://nodejs.org/fr/) et [NPM](https://www.npmjs.com/). Pour Linux :

```bash
sudo apt install snapd npm
sudo snap install node --classic
```

On recommende ici d'utiliser [Snapcraft](https://snapcraft.io/) (snap install) car les dépots sont à jour.

Pour Windows, installez NodeJS et NPM [en téléchargeant l'installeur ici](https://nodejs.org/fr/download/)

- Si vous souhaitez utiliser un serveur MySQL local, vous disposez de la version `8.0` de `mysql-server` avec une base de données dédiée à _SoundBond_ :

```sql
    CREATE DATABASE `nom de la base`;
    CREATE USER '`nom administrateur`'@'localhost' IDENTIFIED BY '`mot de passe`';
    GRANT ALL PRIVILEGES ON `nom de la base`.* to '`nom administrateur`'@'localhost';
    FLUSH PRIVILEGES;
```

Pour installer MySQL sur Windows, rendez-vous [ici](https://openclassrooms.com/fr/courses/1959476-administrez-vos-bases-de-donnees-avec-mysql/1959969-installez-mysql). Sur Linux, exécutez simplement `sudo apt install mysql-server`.

- Installez `yarn` :

```bash
npm install yarn
```

Python3, Python3-pip et Python3-venv sont requis pour l'installation des dépendances de l'API ML.

## Installer SoundBond

### Installer les paquets

Installez les packets NPM de /client et /server, ainsi que les dépendances Python de /ml.

```bash
cd client
yarn install
cd ../server
yarn install
cd ../ml
python -m venv env
.\env\Scripts\activate # ou source env/bin/activate sur Linux
pip install -r requirements.txt
```

Si vous rencontrez l'erreur `The engine "node" is incompatible with this module.`, ajoutez l'option `--ignore-engines` à `yarn install`.

### Installer les variables confidentielles

Copiez le fichier .env.sample en un autre fichier .env.

```bash
cp ./server/.env.sample ./server/.env
```

Puis écrivez-y les valeurs que vous avez défini en initialisant la base de données.

### Lancer les serveurs de développement

Pour le serveur backend

```bash
cd server
npm start
```

Pour le serveur frontend, dans un autre terminal

```bash
cd client
npm start
```

Pour le serveur ML, dans un autre terminal

```bash
cd ml
.\env\Scripts\activate # ou source env/bin/activate sur Linux
uvicorn server:app --reload
```

## Tester l'API REST

Essayez d'insérer un élément dans la base de données depuis l'API.

```bash
curl -i -H "Content-Type: application/json" -X POST -d '{"string_attribute":"hello world"}' http://localhost:5000/example/add
```

## Tests d'interface Selenium

### Installation des pré-requis

#### Linux

Pour Linux, installez les navigateurs Google Chrome avec, dans un _shell_ super-utilisateur :

```bash
# curl -sS -o - https://dl-ssl.google.com/linux/linux_signing_key.pub | apt-key add
# echo "deb http://dl.google.com/linux/chrome/deb/ stable main" >> /etc/apt/sources.list.d/google-chrome.list
# apt-get -y update
# apt-get -y install google-chrome-stable
```

et [Mozilla Firefox](https://www.mozilla.org/fr/firefox/linux/).

#### Microsoft Windows

Pour Windows, installez les navigateurs [Google Chrome](https://www.google.com/intl/fr/chrome/) et [Mozilla Firefox](https://www.mozilla.org/fr/firefox/windows/)

### Lancer les test

Pour lancer les tests, exécutez :

```bash
$ yarn test
```

## Data et ML

### Récupérer le Dataset

Le dataset `` est téléchargeable [ici](https://zenodo.org/record/3612637). Les fichiers sont les suivants :

```txt
root
│
└───FSDKaggle2019.audio_train_curated/               Audio clips in the curated train set
│
└───FSDKaggle2019.audio_train_noisy/                 Audio clips in the noisy train set
│
└───FSDKaggle2019.audio_test/                        Audio clips in the full test set
│
└───FSDKaggle2019.meta/                              Files for evaluation setup
│   │
│   └─── train_curated_post_competition.csv          Ground truth for the curated train set
│   │
│   └─── train_noisy_post_competition.csv            Ground truth for the noisy train set
│   │
│   └─── test_post_competition.csv                   Ground truth for the full test set
│   │
│   └─── vocabulary.csv                              List of sound classes in FSDKaggle2019
│
└───FSDKaggle2019.doc/
    │
    └───README.md                                    The dataset description file that you are reading
    │
    └───LICENSE-DATASET                              License of the FSDKaggle2019 dataset as an entity
```

Pour le moment, nous utilisons audio_train_curated ainsi que les fichiers CSV.

### Les données de Soundbond

Dans Soundbond, nous avons uploadé les fichiers issus de audio_test/, car curated et noisy serviront à entrainer le modèle de ML sur le serveur dédié.
Dans la description, il y a une idée de ce que le serveur de ML devrait trouver, c'est-à-dire des tags séparés par des virgules.

## License

Tous droits réservés.
