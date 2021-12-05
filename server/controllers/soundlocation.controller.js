const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const SoundLocation = db.SoundLocation;
const Op = db.Sequelize.Op;
const soundlocationservice = require("../services/soundlocationService");
const sanitize = require("sanitize-html");

const MESSAGE_FIND_ERROR = "Error retrieving SoundLocation.";
const MESSAGE_DELETE_ERROR = "Could not delete SoundLocation.";
const MESSAGE_UPDATE_ERROR = "Error updating SoundLocation.";

// Create and Save a new SoundLocation
exports.create = (req, res) => {
  // Validate request

  // Create a SoundLocation
  const soundlocation = {
    latitude: req.body.latitude,
    longitude: req.body.longitude,
  };
  // Save SoundLocation in the database
  SoundLocation.create(soundlocation)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while creating the SoundLocation.",
      });
    });
};

// Retrieve all SoundLocations from the database.
exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  SoundLocation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving soundlocations.",
      });
    });
};

// Find a single SoundLocation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SoundLocation.findByPk(id)
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

// Update a SoundLocation by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  SoundLocation.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SoundLocation was updated successfully.",
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

// Delete a SoundLocation with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  SoundLocation.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "SoundLocation was deleted successfully!",
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

// Delete all SoundLocations from the database.
exports.deleteAll = (req, res) => {
  SoundLocation.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({
        message: `${nums} SoundLocations were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message ||
          "Some error occurred while removing all soundlocations.",
      });
    });
};

// find all published SoundLocation
exports.findAllPublished = (req, res) => {
  SoundLocation.findAll({ where: { published: true } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving Soundlocations.",
      });
    });
};

// Pagination : voir https://bezkoder.com/node-js-sequelize-pagination-mysql/

//soundlocation controller
exports.findClosestPositionsofsound = async (req, res) => {
  const id = req.params.id;

  SoundLocation.findByPk(id)
    .then((data) => {
      res.send(soundlocationservice.nearestPosition(data));
    })
    .catch((err) => {
      res.status(500).send({
        message: MESSAGE_FIND_ERROR,
      });
    });
};

exports.findClosestPositions = async (req, res) => {
  const latitude = req.query.latitude;
  const longitude = req.query.longitude;
  const localisation = {
    latitude: latitude,
    longitude: longitude,
  };
  SoundLocation.findAll()
    .then((data) => {
      res.send(soundlocationservice.nearestPosition(localisation, data));
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving closests SoundLocations.",
      });
    });
};
