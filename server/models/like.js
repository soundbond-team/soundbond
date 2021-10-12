'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    var like = sequelize.define(sequelize.define('like'), {
        postId:{
            type:DataTypes.INTERGER,
            references: {
                model: 'post',
                key:'id'
            }
        },
        userId:{
            type:DataTypes.INTERGER,
            references: {
                model: 'user',
                key:'id'
            }
        }
    }, {});

    like.associate = function(models){
        models.user.belongsToMany(models.post, {
            through: model.like,
            foreignKey: userId,
            otherKey: postId,
        });
        models.user.belongsToMany(models.user, {
            through: model.like,
            foreignKey: postId,
            otherKey: userId,
        });

        models.like.belongsTo(models.user, {
            foreign: 'userId',
            as: 'user',
        });

        models.belongsTo(models.post, {
            foreignKey: 'postId',
            as: 'post',
        });
    };

    return like;
}