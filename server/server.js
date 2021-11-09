// instanciation des frameworks requis.
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize"); // ORM
const cookieParser = require("cookie-Parser");
const app = express();
const port = process.env.PORT || 8080; // Port du serveur de développement.
const checkUser = require("./middleware/auth.middleware");

app.use(cors({ credentials: true, origin: "http://localhost:3000" }));
app.use(express.json());
app.use(cookieParser());

// On dit au serveur de servir ces pages.
require("./routes/sound.routes")(app);
require("./routes/soundlocation.routes")(app);
require("./routes/post.routes")(app);
require("./routes/User.routes")(app);

// jwt

app.use(checkUser.checkUser); //a chaque requete nous verifions si l'utilisateur est bien connecté
app.get("/jwtid", checkUser.requireAuth, (req, res) => {
  let id = res.locals.user;
  res.status(200).send(id);
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});

// Récupération de la base de données
const db = require("./models");
const { response } = require("express");

// Test de la connexion.
/*try {
  db.sequelize.authenticate(); //? la documentation suggère d'utiliser await sequelize.authenticate() mais cela génère une erreur.
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}
*/
db.sequelize.sync();

module.exports = app;