/* Un commentaire est publié par un utilisateur sur un Post. */

'use strict';
module.exports = (sequelize, DataTypes) => {
    return sequelize.define('comment', {
        comment: DataTypes.TEXT
    });
}
