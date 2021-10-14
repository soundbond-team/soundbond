"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class SoundLocation extends Model {}
  SoundLocation.init(
    {
      longitude: DataTypes.DECIMAL(9, 6),
      latitude: DataTypes.DECIMAL(8, 6),
    },
    {
      sequelize,
      modelName: "soundlocation",
    }
  );
  return SoundLocation;
};
