const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const Sound = db.Sound;
const SoundLocation = db.SoundLocation;
const Op = db.Sequelize.Op;

// Create and Save a new Sound
exports.create = (req, res) => {
  // Validate request

  // Create a Sound
  const sound = {
    url: req.body.url,
    size: req.body.size,
    startTime: req.body.startTime,
    stopTime: req.body.stopTime,
    duration: req.body.duration,
    uploader_user_id: req.body.uploader_user_id,
    codec: req.body.codec,
    soundlocation_id: req.body.soundlocation_id,
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
exports.findAll = (req, res) => {
  Sound.findAll({
    include: [
      {
        model: SoundLocation,
        as: "soundlocation",
        where: { id: db.Sequelize.col("Sound.soundlocation_id") },
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving sound.",
      });
    });
};

// Find a single Sound with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  Sound.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          message: "Error retrieving Sound with id=" + id,
        })
      );
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
        res.send(
          sanitizeHtml({
            message: `Cannot update Sound with id=${id}. Maybe Sound was not found or req.body is empty!`,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          message: "Error updating Sound with id=" + id,
        })
      );
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
        res.send(
          sanitizeHtml({
            message: `Cannot delete Sound with id=${id}. Maybe Sound was not found!`,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          message: "Could not delete Sound with id=" + id,
        })
      );
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
        message: err.message || "Some error occurred while removing all sound.",
      });
    });
};

// Pagination : voir https://bezkoder.com/node-js-sequelize-pagination-mysql/
