"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {}
  Playlist.init(
    { title: DataTypes.TEXT, description: DataTypes.TEXT },
    {
      sequelize,
      modelName: "playlist",
    }
  );
  return Playlist;
};
