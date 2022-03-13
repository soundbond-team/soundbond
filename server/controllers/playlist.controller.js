const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post } = require("../models");
const Playlist = db.Playlist;
const Op = db.Sequelize.Op;

exports.create = async (req, res) => {
  // Vérification que la requête contient bien toutes les valeurs.
  if (!req.body.list_post || !req.body.publisher_user_id) {
    res.status(400).send({
      message: "Content can not be empty!",
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
  arg.playlist_id permet, si spécifié, de rechercher une playlist avec un ID spécifique.
  */

  var where = {}
  where.publisher_user_id = req.params.user_id;

  if (arg.playlist_id != null) {
    console.log(arg.playlist_id)
    where.id = arg.playlist_id;
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

exports.history = async (req, res, arg) => {
  /* La playlist numéro 1 est l'historique d'écoute. */
  arg.playlist_id=1;
  this.findallForUser(req, res, arg)
}

/*exports.history_add = async (req, res) => {

}*/