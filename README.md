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

__SoundBond__ est un projet de réseau social basé sur le son. Figurez-vous le comme un Instagram des sons. Tous droits réservés.

### Intégration continue

Pour notre intégration continue, nous utilisons [GitHub Actions](https://fr.github.com/features/actions). Les tests sont effectés au moins avant chaque _release_ (lors de _commits_ et _merge_ sur les branches _main_ et _develop_).

### Kanban client

Notre kanban client est disponible [sur Jira](https://soundbond.atlassian.net/jira/software/projects/SOUN/boards/2).

## Pré-requis

Avant de commencer, assurez-vous de satisfaire les pré-requis suivants :

* Vous avez une machine avec `Windows/Linux Ubuntu`. Le fonctionnement avec un autre OS n'est pas garanti.
* Vous avez installé [NodeJS](https://nodejs.org/fr/) et [NPM](https://www.npmjs.com/). Pour Linux :

``` bash
sudo apt install snapd npm
sudo snap install node --classic
```

On recommende ici d'utiliser [Snapcraft](https://snapcraft.io/) (snap install) car les dépots sont à jour.

Pour Windows, installez NodeJS et NPM [en téléchargeant l'installeur ici](https://nodejs.org/fr/download/)

* Si vous souhaitez utiliser le serveur de développement recommandé, vous avez installé `nodemon` version 2.0.12 ou supérieure __au niveau machine (option -g)__.

``` bash
sudo npm install -g nodemon
```

* Si vous souhaitez utiliser un serveur MySQL local, vous disposez de la version `8.0` de `mysql-server` avec une base de données dédiée à _SoundBond_ :

``` sql
    CREATE DATABASE `nom de la base`;
    CREATE USER '`nom administrateur`'@'localhost' IDENTIFIED BY '`mot de passe`';
    GRANT ALL PRIVILEGES ON `nom de la base`.* to '`nom administrateur`'@'localhost';
    FLUSH PRIVILEGES;
```

Pour installer MySQL sur Windows, rendez-vous [ici](https://openclassrooms.com/fr/courses/1959476-administrez-vos-bases-de-donnees-avec-mysql/1959969-installez-mysql). Sur Linux, exécutez simplement `sudo apt install mysql-server`.

* Installez `yarn` :

``` bash
npm install yarn
```

## Installer SoundBond

### Installer les paquets NPM

Installez les packets NPM de /client et /server :

``` bash
cd client
yarn install
cd ../server
yarn install
```

Si vous rencontrez l'erreur `The engine "node" is incompatible with this module.`, ajoutez l'option `--ignore-engines` à `yarn install`.

### Installer les variables confidentielles

Copiez le fichier .env.sample en un autre fichier .env.

``` bash
cp ./server/.env.sample ./server/.env
```

Puis écrivez-y les valeurs que vous avez défini en initialisant la base de données.

### Lancer les serveurs de développement

Pour le serveur backend

``` bash
cd server
nodemon start
```

Pour le serveur frontend, dans un autre terminal

``` bash
cd client
npm start
```

## Tester l'API REST

Essayez d'insérer un élément dans la base de données depuis l'API.

``` bash
curl -i -H "Content-Type: application/json" -X POST -d '{"string_attribute":"hello world"}' http://localhost:5000/example/add
```

## License

Tous droits réservés.
