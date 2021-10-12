/* Un Post est la publication d'un Sound par un
User. Il possède deux clé étrangères :
- vers User, l'utilisateur qui l'a publié,
- vers Sound, le son qui est publié. */

"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {}
  Post.init(
    {
        description:    DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "post",
    }
  );
  return Post;
};
