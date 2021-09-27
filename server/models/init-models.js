var DataTypes = require("sequelize").DataTypes;
var _sound = require("./sound");
var _soundlocation = require("./soundlocation");

function initModels(sequelize) {
  var sound = _sound(sequelize, DataTypes);
  var soundlocation = _soundlocation(sequelize, DataTypes);

  return {
      sound,
    soundlocation,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
