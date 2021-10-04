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

db.SoundLocation.belongsTo(db.Sound, {
    through: "sound_soundlocation",
    as: "sound",
    foreignKey: "sound_id",
});

module.exports = db;
