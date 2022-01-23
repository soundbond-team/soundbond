/* Minimal requiered template for a development server. */

// instanciation des frameworks requis.
const cookieSession = require("cookie-session");
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize"); // ORM
const cookieParser = require("cookie-parser");
const app = express();
const fileupload = require("express-fileupload");
const port = process.env.PORT || 8080; // Port du serveur de développement.
const checkUser = require("./middleware/auth.middleware");
const bodyParser = require("body-parser");
const passport =require("passport");
const passportSetup = require("./passport");

app.use(
  cookieSession({name:"session", keys:["soundbond"], maxAge : 24*60*60*100})
);

app.use(passport.initialize())
app.use(passport.session());

app.use(
  cors({
    credentials: true,
    origin: process.env.FRONT_SERVER_URL,
  })
);
app.use(express.json());
app.use(cookieParser());




//
// File Upload
app.use(fileupload());
app.use(express.static("files"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// On dit au serveur de servir ces pages.
require("./routes/sound.routes")(app);
require("./routes/soundlocation.routes")(app);
require("./routes/post.routes")(app);
require("./routes/blob.routes")(app);
require("./routes/user.routes")(app);
require("./routes/file.routes")(app);
require("./routes/tag.routes")(app);
require("./routes/playlist.routes")(app);
require("./routes/auth.routes")(app);
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
const multer = require("multer");


// Pour synchroniser la base de données après quelques changements, utiliser :
db.sequelize.sync({});

app.post("/upload", (req, res, next) => {
  let imageFile = req.files.file;

  imageFile.mv(`${__dirname}/public/${req.body.filename}.jpg`, function (err) {
    if (err) {
      return res.status(500).send(err);
    }

    res.json({ file: `public/${req.body.filename}.jpg` });
  });
});
module.exports = app;
