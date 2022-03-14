"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Visit extends Model {}
  Visit.init(
    {
      position: DataTypes.STRING,
      sound_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "visit",
    }
  );
  return Visit;
};
