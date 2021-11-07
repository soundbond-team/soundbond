/* Un commentaire est publié par un utilisateur sur un Post. */

'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    return sequelize.define(sequelize.define('comment'), {
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
        },
        comment:{
          type:DataTypes.TEXT,
      }
    }, {});
}