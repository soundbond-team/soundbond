/* Modèle associé à un Sound, contenant uniquement
la latitude et la longitude d'un son.  */

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
