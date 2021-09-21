# SoundBond

[![Build Status](https://app.travis-ci.com/gu1lhem/soundbond.svg?token=mMVNgd82CCyhEB2ReSqx&branch=develop)](https://app.travis-ci.com/gu1lhem/soundbond)

## Installer depuis le dépot

### Installations minimales nécessaires pour Linux

``` bash
sudo apt install snapd
sudo snap install node --classic
sudo npm install -g nodemon
```

### Installer les paquets NPM

``` bash
cd client
npm ci
cd ../server
npm ci
```

### Installer les variables confidentielles

``` bash
cp ./backend/.env.sample ./backend/.env
```
Puis copier l'URL de la base de données MongoDB dans le fichier .env.

### Lancer les serveurs de développement

``` bash
nodemon server.js
```

Et dans un autre terminal
``` bash
cd client
nodemon start
```
ou npm start.

## Installer depuis le début

On utilise le gestionnaire snap pour avoir la dernière version de Node.JS (attention, dans les dépots APT, cette-ci est trop ancienne) :
``` bash
sudo snap install node --classic
```

Pour créer un projet :

``` bash
npx create-react-app .
```
(on suppose que l'on est déjà dans le répertoire du projet, ici soundbound).

Pour initialiser NPM :

``` bash
mkdir backend
cd backend/
npm init
npm install express cors mongoose dotenv
```

- express : lightwirght web framework for node.js
- cors : cross origin ressource sharing : access ressources from remote hosts. middleware : cors with different options -> to access something from outsde the server
- mongoose : interaction with mongodb trough Node.js
- dotenv : environnement variables stored in a file in the project (.env)

``` bash
sudo npm install -g nodemon
```
- -g : install globally
- nodemon : automatically reload when a server file changed on the disk


## Tester l'API REST
``` bash
curl -i -H "Content-Type: application/json" -X POST -d '{"string_attribute":"hello world"}' http://localhost:5000/example/add
```
