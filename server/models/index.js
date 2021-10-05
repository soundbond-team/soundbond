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

module.exports = db;
