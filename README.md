# SoundBond

[![Build Status](https://app.travis-ci.com/gu1lhem/soundbond.svg?token=7WD7QLSzFYsXRujYsxQ5&branch=develop)](https://app.travis-ci.com/gu1lhem/soundbond)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/gu1lhem/soundbond)
![GitHub repo size](https://img.shields.io/github/repo-size/gu1lhem/soundbond)
[![Coverage Status](https://coveralls.io/repos/github/gu1lhem/soundbond/badge.svg)](https://coveralls.io/github/gu1lhem/soundbond)
## A propos

__SoundBond__ est un projet de réseau social basé sur le son. Figurez-vous le comme un Instagram des sons. Tous droits réservés.

### Intégration continue

Nous utilisons [Travis CI](https://travis-ci.org/) connecté à GitHub. Les tests sont effectés avant chaque _release_.

### Kanban client

Notre kanban client est disponible [ici]([ici](https://github.com/gu1lhem/soundbond/projects)).

## Pré-requis

Avant de commencer, assurez-vous de satisfaire les pré-requis suivants :

* Vous avez une machine avec `Windows/Linux Ubuntu`. Le fonctionnement avec tout autre OS n'est pas garanti.
* Vous avez installé `NodeJS`. Par exemple pour Linux :

``` bash
sudo apt install snapd
sudo snap install node --classic
```

* Vous avez installé `NPM`
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

## Installer SoundBond

### Installer les paquets NPM

Installez les packets NPM de /client et /server :

``` bash
cd client
yarn install (si npm ci ne marche pas)
cd ../server
npm ci
```

### Installer les variables confidentielles

Copiez le fichier .env.sample en un autre fichier .env.

``` bash
cp ./server/.env.sample ./server/.env
```

Puis copiez-y l'URL de la base de données MongoDB.

### Lancer les serveurs de développement

Pour le serveur backend

``` bash
cd server
nodemon server.js
```

Pour le serveur frontend

``` bash
cd client
nodemon start
```

## Tester l'API REST

Essayez d'insérer un élément dans la base de données depuis l'API.

``` bash
curl -i -H "Content-Type: application/json" -X POST -d '{"string_attribute":"hello world"}' http://localhost:5000/example/add
```

## License

Tous droits réservés.
