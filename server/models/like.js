'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(sequelize.define('like'), {
        postId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'post',
                key:'id'
            }
        },
        userId:{
            type:DataTypes.INTEGER,
            references: {
                model: 'user',
                key:'id'
            }
        }
    }, {});

}