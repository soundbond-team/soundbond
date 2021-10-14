/* Un User est un compte utilisateur sur la
plateforme Soundbond. A User sont associés :
- les sons qu'ils a téléversé
- les posts qu'il a publié
- les posts auxquels il a attribué un "j'aime". */

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model { }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'user',
  });
  return User;
};