const db = require("../models");
const Post = db.Post;
const Sound = db.Sound;
const SoundLocation = db.SoundLocation;
const Op = db.Sequelize.Op;

// Création d'un nouveau Post.
exports.create = (req, res) => {
  // Vérification que la requête contient bien toutes les valeurs.
  if (
    !req.body.description ||
    !req.body.publisher_user_id ||
    !req.body.sound_id
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Créer un post à partir des données dans la requête POST.
  const post = {
    description: req.body.description,
    publisher_user_id: req.body.publisher_user_id,
    sound_id: req.body.sound_id,
  };

  // Enregistrement dans la base. .create créé et commit dans la base d'un seul coup.
  Post.create(post)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while creating the post.",
      });
    });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {
  Post.findAll({
    include: [
      {
        model: Sound,
        as: "publishing",

        include: [
          {
            model: SoundLocation,
            as: "soundlocation",
            // where: { id: db.Sequelize.col("Sound.soundlocation_id") },
          },
        ],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while retrieving post.",
      });
    });
};
exports.getAllLike = (req, res) => {
  const id = req.params.id;
  console.log("salut");
  Post.findByPk(id)
    .then((data) => {
      console.log(data.like);
      let like = {
        like: data.like,
      };
      res.send(like);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving Post with id=" + id,
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Post.findByPk(id, {
    include: [
      {
        model: Sound,
        as: "publishing",

        include: [
          {
            model: SoundLocation,
            as: "soundlocation",
          },
        ],
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving Post with id=" + id,
      });
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;
  console.log(req.body);
  Post.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send({
            error: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error updating Post with id=" + id,
      });
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send({
            error: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Could not delete Post with id=" + id,
      });
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  Post.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while removing all post.",
      });
    });
};

// Pagination : voir https://bezkoder.com/node-js-sequelize-pagination-mysql/
