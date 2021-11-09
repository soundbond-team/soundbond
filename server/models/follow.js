'use strict';
const {
  Model
} = require('sequelize');

class Follow extends Model {
  static init(sequelize) {
    super.init(
      {
        user_from: DataTypes.INTEGER,
        user_to: DataTypes.INTEGER
      },
      {
        sequelize,
        tableName: "follows"
      }
    );
  }

  
  static associate(models) {
    models.user.belongsToMany(models.user,{
      through : models.follow,
      foreignKey:user_from,
      otherkey:user_to,
    });
    models.user.belongsToMany(models.user,{
      through : models.follow,
      foreignKey:user_from,
      otherkey:user_to,
    });

    this.belongsTo(models.User, {
      foreignKey: "user_from",
      through: "follows",
      as: "fromFollows"
    });
    this.belongsTo(models.User, {
      foreignKey: "user_to",
      through: "follows",
      as: "getUserFollows"
    });
  };

  
}
module.exports = Follow;
