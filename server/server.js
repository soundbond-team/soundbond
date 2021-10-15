/* Minimal requiered template for a development server. */

// instanciation des frameworks requis.
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize"); // ORM

const app = express();
const port = process.env.PORT || 8080; // Port du serveur de développement.

app.use(cors());
app.use(express.json());

// On dit au serveur de servir ces pages.
require("./routes/sound.routes")(app);
require("./routes/soundlocation.routes")(app);
require("./routes/post.routes")(app);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Récupération de la base de données
const db = require("./models");

// Test de la connexion.
try {
  db.sequelize.authenticate(); //? la documentation suggère d'utiliser await sequelize.authenticate() mais cela génère une erreur.
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

db.sequelize.sync();

module.exports = app;
