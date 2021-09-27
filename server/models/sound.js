'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Sound extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Sound.init({
    title: DataTypes.STRING,
    description: DataTypes.TEXT,
    url: DataTypes.TEXT,
    size: DataTypes.INTEGER,
    codec: DataTypes.STRING,
    startTime: DataTypes.BIGINT,
    stopTime: DataTypes.BIGINT,
    duration: DataTypes.INTEGER,
    pubDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Sound',
  });
  return Sound;
};