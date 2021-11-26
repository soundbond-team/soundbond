const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post } = require("../models");
const Playlist = db.Playlist;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
  const sound = {
    description: req.body.description,
    publisher_user_id: req.body.publisher_user_id,
  };

  Playlist.create(sound)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Sound.",
      });
    });
};
