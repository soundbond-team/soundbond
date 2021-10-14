/* Modèle contenant toute les informations sur un
fichier son, nottament les métadonnées et le lien
vers le fichier lui-même.
A chaque Sound est associé un SoundLocation.
Chaque Sound possède en outre une référence vers un
User, son uploader. */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Sound extends Model {}
  Sound.init(
    {
      url: DataTypes.TEXT,
      size: DataTypes.INTEGER,
      codec: DataTypes.STRING,
      startTime: DataTypes.BIGINT,
      stopTime: DataTypes.BIGINT,
      duration: DataTypes.INTEGER,
      // clé étrangère vers User : uploader.
      // clé étrangère vers soundlocation : location.
    },
    {
      sequelize,
      modelName: "sound",
    }
  );
  return Sound;
};
