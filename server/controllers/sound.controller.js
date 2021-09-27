const db = require("../models");
const Sound = db.sound;
const Op = db.Sequelize.Op;

// Create and Save a new Sound
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a Sound
  const sound = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
  };

  // Save Sound in the database
  Sound.create(sound)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the Sound.",
      });
    });
};

// Retrieve all Sounds from the database.
/*exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Sound.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sound.",
      });
    });
};*/

// Find a single Sound with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sound.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Sound with id=" + id,
      });
    });
};

// Update a Sound by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  Sound.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Sound was updated successfully.",
        });
      } else {
        res.send({
          message: `Cannot update Sound with id=${id}. Maybe Sound was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Sound with id=" + id,
      });
    });
};

// Delete a Sound with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  Sound.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Sound was deleted successfully!",
        });
      } else {
        res.send({
          message: `Cannot delete Sound with id=${id}. Maybe Sound was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Sound with id=" + id,
      });
    });
};

// Delete all Sounds from the database.
exports.deleteAll = (req, res) => {
  Sound.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Sounds were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all sound.",
      });
    });
};

// find all published Sound
exports.findAllPublished = (req, res) => {
  Sound.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sound.",
      });
    });
};

// Pagination : voir https://bezkoder.com/node-js-sequelize-pagination-mysql/
