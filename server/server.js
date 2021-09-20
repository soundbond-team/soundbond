/* Minimal requiered template for a development server. */

// instanciation des frameworks requis.
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Récupération de la configuration confidentielle.
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000; // Port du serveur de développement

app.use(cors());
app.use(express.json());

// Instanciation de la connexion à la base de données MongoDB.
const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Instanciation des fichiers de route
const exercisesRouter = require('./routes/example');

// On dit au serveur de servir ces pages.
app.use('/api/example', exercisesRouter);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
