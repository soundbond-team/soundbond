var DataTypes = require("sequelize").DataTypes;
var _sound = require("./sound");
var _soundlocation = require("./soundlocation");
//var _user = require("./User");

function initModels(sequelize) {
  var sound = _sound(sequelize, DataTypes);
  var soundlocation = _soundlocation(sequelize, DataTypes);
  //var user = _user(sequelize, DataTypes);

  return {
    sound,
    soundlocation,
    //user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
