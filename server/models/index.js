// Récupération de la configuration confidentielle.
require("dotenv").config();

const Sequelize = require("sequelize");
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

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sounds = require("./sound.model")(sequelize, Sequelize);

module.exports = db;
