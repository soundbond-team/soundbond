'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SoundLocation extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  SoundLocation.init({
    longitude: DataTypes.INTEGER,
    latitude: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'SoundLocation',
  });
  return SoundLocation;
};