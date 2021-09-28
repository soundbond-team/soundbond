const db = require("../models");
const SoundLocation = db.SoundLocation;
const Op = db.Sequelize.Op;

// Create and Save a new SoundLocation
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Create a SoundLocation
  const soundlocation = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false,
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
/*exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  SoundLocation.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving soundlocations.",
      });
    });
};*/

// Find a single SoundLocation with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  SoundLocation.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SoundLocation with id=" + id,
      });
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
        res.send({
          message: `Cannot update SoundLocation with id=${id}. Maybe SoundLocation was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating SoundLocation with id=" + id,
      });
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
        res.send({
          message: `Cannot delete SoundLocation with id=${id}. Maybe SoundLocation was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete SoundLocation with id=" + id,
      });
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
          err.message || "Some error occurred while retrieving soundlocations.",
      });
    });
};

exports.findClosestPositions = async (req, res) => {
  const id = req.params.id;
  console.log(id + "fffffffffffffffffffffffffffffff");

  SoundLocation.findByPk(id)
    .then((data) => {
      nearestPosition(data, res);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SoundLocation with id=" + id,
      });
    });
};

// Pagination : voir https://bezkoder.com/node-js-sequelize-pagination-mysql/
function distance(lat1, lon1, lat2, lon2, unit) {
  var radlat1 = (Math.PI * lat1) / 180;
  var radlat2 = (Math.PI * lat2) / 180;
  var theta = lon1 - lon2;
  var radtheta = (Math.PI * theta) / 180;
  var dist =
    Math.sin(radlat1) * Math.sin(radlat2) +
    Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  if (unit == "K") {
    dist = dist * 1.609344;
  }
  if (unit == "N") {
    dist = dist * 0.8684;
  }
  return dist;
}
function nearestPosition(localisation, res) {
  console.log(localisation);
  SoundLocation.findAll()
    .then((data) => {
      let allPositions = data;
      let distance_list = [];
      let nearestPosition = [];
      let position_sorted = [];
      var element = {};
      for (var i = 0; i < allPositions.length; i++) {
        var element = {};
        element.id = allPositions[i];
        element.value = distance(
          localisation.latitude,
          localisation.longitude,
          allPositions[i].latitude,
          allPositions[i].longitude,
          "K"
        );
        distance_list[i] = element;
        console.log(element.value);
      }

      let x = distance_list.sort(function (a, b) {
        return parseFloat(a.value) - parseFloat(b.value);
      });
      /*  for (const [key, value] of Object.entries(position_sorted)) {
        console.log(`${key}: ${value}`);
      }*/
      x.forEach((element) => console.log(element.value));
      for (var i = 0; i < 2; i++) {
        nearestPosition.push(x[i].id);
      }

      nearestPosition.forEach((element) => console.log(element));
      res.send(nearestPosition);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving SoundLocation with id=" + id,
      });
    });
}
