const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post } = require("../models");
const Playlist = db.Playlist;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  /* Création d'une playlist et ajout d'éventuels titres si spécifiés. */

  // Vérification que la requête contient bien toutes les valeurs.
  if (!req.body.list_post || !req.body.publisher_user_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  //! Il faudrait plutôt ajouter la vérification qu'une playlist du même nom n'existe pas pour l'utilisateur spécifié
  if (req.body.title === "History") {
    res.status(400).send({
      message: "'History' is not a reserved name.",
    });
    return;
  }

  // Créer un post à partir des données dans la requête POST.
  const playlist = {
    title: req.body.title,
    description: req.body.description,
    publisher_user_id: req.body.publisher_user_id,
  };
  // Enregistrement dans la base. .create créé et commit dans la base d'un seul coup.
  const playlistcreate = await Playlist.create(playlist);

  if (Object.keys(req.body.list_post).length > 0) {
    for (let value of Object.values(req.body.list_post)) {
      db.Post.findByPk(value.id).then(async (data) => {
        await playlistcreate.addListpost(data);
      });
    }
    res.status(200).send("created");
  } else {
    res.status(500).send("err");
  }
};

exports.findallForUser = (req, res, arg) => {
  /*
  Trouver chaque playlist créée par l'utilisateur user_id.
  arg.playlist_title permet, si spécifié, de rechercher une playlist avec un titre spécifique.
  */

  var where = {}
  where.publisher_user_id = req.params.user_id;

  if (arg.playlist_title != null) {
    where.title = arg.playlist_title;
  }

  Playlist.findAll({
    where: where,
    include: [
      {
        model: Post,
        as: "listpost",
        include: [
          {
            model: db.Sound,
            as: "publishing",

            include: [
              {
                model: db.SoundLocation,
                as: "soundlocation",
              },

              {
                model: db.User,
                as: "visited_by",
                attributes: ["id", "username"],
              },
            ],
          },
          {
            model: db.User,
            as: "publisher",
            attributes: ["id", "username"],
          },
          {
            model: db.User,
            as: "liked_by",
            attributes: ["id", "username"],
          },
          {
            model: db.Comments,
            as: "comments_on_post",
            attributes: ["id", "comment"],
            include: [
              {
                model: db.User,
                as: "commented_by_user",
                attributes: ["id"],
              },
            ],
          },
          {
            model: db.Tag,
            as: "tagpost",
          },
          {
            model: db.User,
            as: "shared_by",
            attributes: ["id", "username"],
          },
          {
            model: db.User,
            as: "saved_by",
            attributes: ["id", "username"],
          },
        ],
      },
    ],
  }).then((data) => {
    res.send(data);
  });
};

exports.addTitlesToPlaylist = async (req, res) => {
  /* Ajout d'un ou plusieurs titres à une playlist. */

  // Vérification que la requête contient bien list_post.
  if (!req.body.list_post) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var where = {}
  // On ajoute l'id de la playlist à la clause where.
  if (req.body.playlist_id != null) {
    where.id = arg.playlist_id;
  }
  // S'il n'y a pas de playlist_id en paramètres, on ajoute publisher_user_id et title.
  else if ((req.body.publisher_user_id != null) && (req.body.title != null)) {
    where.publisher_user_id = req.body.publisher_user_id
    where.title = req.body.title
  }
  // S'il n'y a rien de tout cela, on renvoit une erreur.
  else {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  await Playlist.findOne({
    where: where
  }).then((playlist) => {

    if (Object.keys(req.body.list_post).length > 0) {
      for (let value of Object.values(req.body.list_post)) {
        console.log(value);
        db.Post.findByPk(value.id).then(async (data) => {
          await playlist.addListpost(data);
        });
      }
      res.status(200).send("added");
    } else {
      res.status(500).send("err");
    }
  })
};

exports.history = async (req, res, arg) => {
  /* La playlist numéro 1 est l'historique d'écoute. */
  arg.playlist_title = "History";
  this.findallForUser(req, res, arg)
}

/*exports.history_add = async (req, res) => {

}*/