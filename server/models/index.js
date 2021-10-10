"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const db = {};

// Récupération de la configuration confidentielle.
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.USERNAME,
  process.env.PASSWORD,
  {
    host: process.env.HOST,
    dialect: "mysql",
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Sound = require("./sound")(sequelize, Sequelize);
db.SoundLocation = require("./soundlocation")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);

// Chaque Sound possède des attributs de localisation.
db.SoundLocation.belongsTo(db.Sound, {
    through: "sound_soundlocation",
    as: "sound",
    foreignKey: "sound_id",
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
})
db.User.belongsToMany(db.Post, {
    through: "likes",
    as: "liked_posts", 
    foreignKey: "post_id",
})

module.exports = db;
