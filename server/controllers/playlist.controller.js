const db = require("../models");
const { Post, TitreListe } = require("../models");

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
  const playlistcreated = await db.Playlist.create(playlist);

  if (Object.keys(req.body.list_post).length > 0) {
    for (let post of Object.values(req.body.list_post)) {
      db.Post.findByPk(post.id).then(async (found_post) => {
        let titreliste = {
          playlist_id: playlistcreated.id,
          user_id: req.body.publisher_user_id,
          post_id: found_post.id,
        };
        await db.TitreListe.create(titreliste).then(() => {
          res.status(200).send("created");
        });
      });
    }
  }
  res.status(500).send("err");
};

exports.findallForUser = (req, res, arg) => {
  /*
  Trouver chaque playlist créée par l'utilisateur user_id.
  arg.playlist_title permet, si spécifié, de rechercher une playlist avec un titre spécifique.
  */

  var where = {};
  // If publisher_user_id is null, send empty array and exit.
  if (req.params.user_id == "undefined") {
    res.status(200).send([]);
    return;
  }
  else {
    where.publisher_user_id = req.params.user_id;
    console.log("AAAAAAAAA")
    if (arg.playlist_title != null) {
      where.title = arg.playlist_title;
    }
    console.log(where)
    console.log("AAAAAAAAA")
    db.Playlist.findAll({
      where: where,
      include: [
        {
          model: TitreListe,
          as: "has_titreliste",
          attributes: ["id", "createdAt", "updatedAt"],
          include: [
            {
              model: Post,
              as: "adds_the_post",
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
        },
      ],
    }).then((data) => {
      console.log("AAAAAAAAA")
      console.log(data);
      res.send(data);
    });
  }
};

exports.addTitleToPlaylist = async (req, res, arg) => {
  /* Ajout d'un titre à une playlist. */

  // Vérification que la requête contient bien un post.
  if (!req.body.post_id) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  var where = {};
  // On ajoute l'id de la playlist à la clause where.
  if (req.body.playlist_id != null) {
    where.id = req.body.playlist_id;
  }
  // S'il n'y a pas de playlist_id en paramètres, on ajoute publisher_user_id et title.
  else if (req.body.publisher_user_id != null && req.body.title != null) {
    where.publisher_user_id = req.body.publisher_user_id;
    where.title = req.body.title;
  }
  // S'il n'y a rien de tout cela, on renvoit une erreur.
  else {
    res.status(400).send({
      message: "Content can not be empty!!",
    });
    return;
  }

  await db.Playlist.findOne({
    where: where,
  }).then((playlist) => {

    // Vérifier que l'on n'essaie par d'ajouter un post manuellement à son historique.
    if (arg) {
      if (arg.history_add) {
        if (playlist.titre === "History") {
          res.status(500).send("Cannot manually add a post to your history.");
          return;
        }
      }
    }

    db.Post.findByPk(req.body.post_id).then(async (foundpost) => {
      let titreliste = {
        playlist_id: playlist.id,
        user_id: playlist.publisher_user_id, //!A CHANGER si on veut faire des playlist avec plusieurs users
        post_id: foundpost.id,
      };
      console.log(titreliste);
      await db.TitreListe.create(titreliste).then(() => {
        res.status(200).send("added");
      });
    });

  });
};

exports.history = async (req, res, arg) => {
  /* La playlist numéro 1 est l'historique d'écoute. On la retourne. */
  arg.playlist_title = "History";
  this.findallForUser(req, res, arg);
};

exports.history_add = async (req, res, arg) => {
  /* Ajouter un titre à l'historique d'écoute.
  Nécessite le paramètre body
  - post_id
  */
  req.body.title = "History";
  req.body.publisher_user_id = req.params.user_id;
  arg.history_add = true; // Utilisé pour savoir si l'on ajoute un titre via la route API de l'historique.
  this.addTitleToPlaylist(req, res);
};
