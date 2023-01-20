const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const Sound = db.Sound;
const SoundLocation = db.SoundLocation;
const Visit = db.Visit;
const Op = db.Sequelize.Op;

const MESSAGE_FIND_ERROR = "Error retrieving Sound.";
const MESSAGE_DELETE_ERROR = "Could not delete Sound.";
const MESSAGE_UPDATE_ERROR = "Error updating Sound.";

exports.create = (req, res) => {
  // Create and Save a new Sound

  // Create a Sound instance
  const sound = {
    url: req.body.url,
    size: req.body.size,
    startTime: req.body.startTime,
    stopTime: req.body.stopTime,
    duration: req.body.duration,
    uploader_user_id: req.body.uploader_user_id,
    codec: req.body.codec,
    soundlocation_id: req.body.soundlocation_id,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
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
      {
        model: db.User,
        as: "visited_by",
        attributes: ["id", "username"],
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
          message: MESSAGE_FIND_ERROR,
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
            message: MESSAGE_UPDATE_ERROR,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          message: MESSAGE_UPDATE_ERROR,
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
            message: MESSAGE_DELETE_ERROR,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          message: MESSAGE_DELETE_ERROR,
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

exports.visit = async (req, res) => {
  const id = req.params.id;
  const user_id = req.body.user_id;
  db.Sound.findByPk(id).then(async (sound) => {
    /* Visit:
    {
      position: DataTypes.STRING,
      sound_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
      nb_visit: DataTypes.INTEGER,
    },*/

    // If the user has already visited the sound, we add 1 to the nb_visit
    const visit = await Visit.findOne({
      where: {
        sound_id: id,
        user_id: user_id,
      },
    });
    if (visit) {
      visit.nb_visit += 1;
      await visit.save();
      res.status(201).json("visited");
      return;
    }
    
    // If the user has not visited the sound, we create a new visit
    try {
      if (req.body.position) {
        await sound.addVisited_by(user_id, {
          through: {
            position: req.body.position,
            nb_visit: 1,
          },
        });
      } else {
        await sound.addVisited_by(user_id, {
          through: {
            nb_visit: 1,
          },
        });
      }
      res.status(201).json("visited");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};
