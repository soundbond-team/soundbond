"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class TitreListe extends Model {}
  TitreListe.init(
    {
    },
    {
      sequelize,
      modelName: "titreliste",
    }
  );
  return TitreListe;
};
