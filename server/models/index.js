"use strict";

const Sequelize = require("sequelize");
const db = {};

/***%%%*** Configuration de la connexion ***%%%***/

// Récupération de la configuration confidentielle.
require("dotenv").config();

// Instanciation d'une connexion soit avec une bd dev soit une prod.
// La bd dev est en sqlite pour faciliter les tests alors que prod vocation a réellement stocker les données.
const initiateConnection = () => {
  if (process.env.ENV == "tests") {
    return new Sequelize(
      process.env.DATABASE,
      process.env.USERNAME,
      process.env.PASSWORD,
      {
        host: process.env.HOST,
        dialect: "sqlite",
        storage: "database.sqlite",
        port: process.env.PORT,
        dialectOptions: {
          encrypt: true,
        },
      }
    );
  }
  return new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,
    {
      host: process.env.HOST,
      dialect: "mssql",
    }
  );
};

const sequelize = initiateConnection();

/***%%%*** Récupération de chaque modèles dans db pour une utilisation dans les autres modules ***%%%***/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Sound = require("./sound")(sequelize, Sequelize);
db.SoundLocation = require("./soundlocation")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

/***%%%*** Déclaration des clés étrangères ***%%%***/

// Chaque Sound possède des attributs de localisation.
db.Sound.belongsTo(db.SoundLocation, {
  through: "sound",
  as: "soundlocation",
  foreignKey: "soundlocation_id",
});

// Chaque Sound est téléversé par un User
db.Sound.belongsTo(db.User, {
  through: "user_sound",
  as: "uploader",
  foreignKey: "uploader_user_id",
});

// Chaque Post est publié par un User
db.Post.belongsTo(db.User, {
  through: "user_post",
  as: "publisher",
  foreignKey: "publisher_user_id",
});

// Chaque Post publie un Sound
db.Post.belongsTo(db.Sound, {
  /* Avec belongsTo, la clé sound_id sera 
       ajoutée au modèle Source : Post.
       belongsTo ajoute les méthodes d'instance
       'getSound', 'setSound', et 'createSound'.
       Comme on a un alias, on utilisera
       getPublishing, setPublishing, createPublishing. */
  through: "sound_post",
  as: "publishing",
  foreignKey: "sound_id",
});

// Relation plusieurs à plusieurs pour les posts likés
db.Post.belongsToMany(db.User, {
  /* L'alias (as:) nous permet d'accéder aux likes d'un
       post et d'un utilisateur aver mon_post.likes ou
       mon_user.likes.
       https://sequelize.org/master/manual/assocs.html#defining-an-alias */
  through: "likes",
  as: "liked_by",
  foreignKey: "user_id",
});
db.User.belongsToMany(db.Post, {
  through: "likes",
  as: "liked_posts",
  foreignKey: "post_id",
});

/***%%%*** Exportation db pour une utilisation dans les autres modules ***%%%***/

module.exports = db;
