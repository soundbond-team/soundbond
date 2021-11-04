'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  var follow = sequelize.define(sequelize.define('follow'),{
    
    user_from:{
        type: DataTypes.INTEGER,
        references : {
          model :'user',
          key:'id'
        }
        
    },

    user_to: {
        type : DataTypes.INTEGER,
        references : {
          model :'user',
          key:'id'
        }
    },
    
      
    
  },{});

  
  follow.associate=function(models) {
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

  return follow;
}

