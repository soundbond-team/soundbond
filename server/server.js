/* Minimal requiered template for a development server. */

// instanciation des frameworks requis.
const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');

// Récupération de la configuration confidentielle.
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080; // Port du serveur de développement.

app.use(cors());
app.use(express.json());

// Instanciation de la connexion à la base de données MySQL avec Sequelize.
const sequelize = new Sequelize(process.env.DATABASE, process.env.USERNAME, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: 'mysql'
});
/*
Sequelize will keep the connection open by default, and use the same
connection for all queries. If you need to close the connection, call
sequelize.close() (which is asynchronous and returns a Promise).
*/

// Test de la connexion.
try {
    sequelize.authenticate(); //? la documentation suggère d'utiliser await sequelize.authenticate() mais cela génère une erreur.
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}
  

// Instanciation des fichiers de route.
const exercisesRouter = require('./routes/example');

// On dit au serveur de servir ces pages.
app.use('/api/example', exercisesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
