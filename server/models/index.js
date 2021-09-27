'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

// Récupération de la configuration confidentielle.
require("dotenv").config();

const sequelize = new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD, {
        host: process.env.HOST,
        dialect: "mysql",
        // operatorsAliases: false, //? ne sait pas à quoi ça sert
    }
);
/*
    Sequelize will keep the connection open by default, and use the same
    connection for all queries. If you need to close the connection, call
    sequelize.close() (which is asynchronous and returns a Promise).
    Se référer à https://sequelize.org/master/manual/getting-started.html
    section Logging pour gérer le log.
    Configuration a ajouter pour faire une pool de connexions :
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle
    }
*/

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.sound = require("./sound")(sequelize, Sequelize);
db.soundlocation = require("./soundlocation")(sequelize, Sequelize);

module.exports = db;
