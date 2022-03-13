"use strict";

const Sequelize = require("sequelize");
const db = {};

/***%%%*** Configuration de la connexion ***%%%***/

// Récupération de la configuration confidentielle.
require("dotenv").config();

// Instanciation d'une connexion soit avec une bd dev soit une prod.
// La bd dev est en sqlite pour faciliter les tests alors que prod vocation a réellement stocker les données.
const initiateConnection = () => {
  if (process.env.ENV == "tests") {
    return new Sequelize("sqlite:./database.sqlite");
  }

  return new Sequelize(
    process.env.DATABASE,
    process.env.USERNAME,
    process.env.PASSWORD,

    {
      host: process.env.HOST,
      dialect: "mssql",
    }
  );
};

const sequelize = initiateConnection();

/***%%%*** Récupération de chaque modèles dans db pour une utilisation dans les autres modules ***%%%***/

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Sound = require("./sound")(sequelize, Sequelize);
db.SoundLocation = require("./soundlocation")(sequelize, Sequelize);
db.User = require("./user")(sequelize, Sequelize);
db.Post = require("./post")(sequelize, Sequelize);
db.Comments = require("./comment")(sequelize, Sequelize);
db.Tag = require("./tag")(sequelize, Sequelize);
db.Playlist = require("./playlists")(sequelize, Sequelize);

/***%%%*** Déclaration des clés étrangères ***%%%***/
//Chaque Post a un ou plusieurs tags
db.Post.belongsToMany(db.Tag, {
  through: "tag_post",
  as: "tagpost",
  foreignKey: "post_id",
});

db.Tag.belongsToMany(db.Post, {
  through: "tag_post",
  as: "tagging",
  foreignKey: "tagging_id",
});
// Chaque Sound possède des attributs de localisation.
db.Sound.belongsTo(db.SoundLocation, {
  through: "sound",
  as: "soundlocation",
  foreignKey: "soundlocation_id",
});

// Chaque Sound est téléversé par un User
db.Sound.belongsTo(db.User, {
  through: "user_sound",
  as: "uploader",
  foreignKey: "uploader_user_id",
});

db.Sound.belongsToMany(db.User, {
  through: "visits",
  as: "visited_by",
  foreignKey: "sound_id",
});
db.User.belongsToMany(db.Sound, {
  through: "visits",
  as: "visits_posts",
  foreignKey: "user_id",
});





db.User.hasOne(db.Playlist, {
  through: "user_playlist",
  as: "publisher",
  foreignKey: "publisher_user_id",
});

db.Post.belongsToMany(db.Playlist, {
  through: "post_playlist",
  as: "listplaylist",
  foreignKey: "post_id",
});
db.Playlist.belongsToMany(db.Post, {
  through: "post_playlist",
  as: "listpost",
  foreignKey: "playlist_id",
});


// Chaque Post est publié par un User

db.Post.belongsTo(db.User, {
  through: "user_post",
  as: "publisher",
  foreignKey: "publisher_user_id",
});

// Chaque Post publie un Sound
db.Post.belongsTo(db.Sound, {
  /* Avec belongsTo, la clé sound_id sera 
       ajoutée au modèle Source : Post.
       belongsTo ajoute les méthodes d'instance
       'getSound', 'setSound', et 'createSound'.
       Comme on a un alias, on utilisera
       getPublishing, setPublishing, createPublishing. */
  through: "sound_post",
  as: "publishing",
  foreignKey: "sound_id",
});


// Posts likés

db.Post.belongsToMany(db.User, {
  /* L'alias (as:) nous permet d'accéder aux likes d'un
       post et d'un utilisateur aver mon_post.likes ou
       mon_user.likes.
       https://sequelize.org/master/manual/assocs.html#defining-an-alias
    La table likes sera automatiquement définie.*/
  through: "likes",
  as: "liked_by",
  foreignKey: "post_id",
});
db.User.belongsToMany(db.Post, {
  through: "likes",
  as: "liked_posts",
  foreignKey: "user_id",
});


// Posts enregistrés

db.Post.belongsToMany(db.User, {
  through: "enregistrement",
  as: "saved_by",
  foreignKey: "post_id",
});
db.User.belongsToMany(db.Post, {
  through: "enregistrement",
  as: "saved_posts",
  foreignKey: "user_id",
});


// Commentaires

db.Comments.belongsTo(db.User, {
  /* L'alias (as:) nous permet d'accéder aux likes d'un
       post et d'un utilisateur aver mon_post.likes ou
       mon_user.likes.
       https://sequelize.org/master/manual/assocs.html#defining-an-alias */
  as: "commented_by_user",
  foreignKey: "user_id",
});
db.User.hasMany(db.Comments, {
  as: "user_is_commenting",
  foreignKey: "user_id",
});

db.Comments.belongsTo(db.Post, {
  as: "comments_the_post",
  foreignKey: "post_id",
});
db.Post.hasMany(db.Comments, {
  as: "comments_on_post",
  foreignKey: "post_id",
});


// Abonnements

db.User.belongsToMany(db.User, {
  through: "abonnement",
  as: "follow",
  foreignKey: "follower_id",
});

db.User.belongsToMany(db.User, {
  through: "abonnement",
  as: "following",
  foreignKey: "following_id",
});


// Partages

// Relation M:M pour les posts partagés
db.Post.belongsToMany(db.User, {
  through: "shares",
  as: "shared_by",
  foreignKey: "post_id",
});
db.User.belongsToMany(db.Post, {
  through: "shares",
  as: "shared_posts",
  foreignKey: "user_id",
});

/***%%%*** Exportation db pour une utilisation dans les autres modules ***%%%***/

module.exports = db;
