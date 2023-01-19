"use strict";
module.exports = (sequelize, DataTypes) => {
  return sequelize.define("visit", {
    user_id: DataTypes.INTEGER,
    post_id: DataTypes.INTEGER
  });
};
