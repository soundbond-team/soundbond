/* Un commentaire est publié par un utilisateur sur un Post. */

"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("tag", {
    tag: DataTypes.TEXT,
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
  });
};
