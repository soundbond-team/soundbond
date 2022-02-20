/* Un User est un compte utilisateur sur la
plateforme Soundbond. A User sont associés :
- les sons qu'ils a téléversé
- les posts qu'il a publié
- les posts auxquels il a attribué un "j'aime". */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {}
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type :DataTypes.STRING,
        allowNull : true,  
      },
      googleId: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "user",
    }
  );
  return User;
};
