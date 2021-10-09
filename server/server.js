/* Minimal requiered template for a development server. */

var bodyParser = require('body-parser');
var apiRouter = require('./apiRouter');

// instanciation des frameworks requis.
const express = require("express");
var router = express.Router();
const cors = require("cors");
const { Sequelize } = require("sequelize"); // ORM
var server = express();
const app = express();
const port = process.env.PORT || 8080; // Port du serveur de développement.


// Body parser configuration
server.use(bodyParser.urlencoded({extended:true}));
server.use(bodyParser.json());
server.use('/api/',apiRouter);

app.use(cors());
app.use(express.json());

require("./routes/sound.routes")(app);
require("./routes/soundlocation.routes")(app);

// On dit au serveur de servir ces pages.
//app.use("/api/sound", exercisesRouter);
// Il n'est peut-être pas nécessaire d'utiliser cette ligne car
// // Instanciation des fichiers de route.
//const exercisesRouter = require("./routes/sound"); 
// a été remplacé par
// require("./routes/sound.routes")(app);

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});


// Récupération de la base de données

const db = require("./models");
const { ServerApiVersion } = require('mongodb');

// Test de la connexion.
try {
    db.sequelize.authenticate(); //? la documentation suggère d'utiliser await sequelize.authenticate() mais cela génère une erreur.
    console.log("Connection has been established successfully.");
} catch (error) {
    console.error("Unable to connect to the database:", error);
}

db.sequelize.sync();

/*
db.sequelize.sync({ force: true }).then(() => {
  console.log("Drop and re-sync db.");
});
*/
module.exports = router;