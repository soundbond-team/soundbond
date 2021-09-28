module.exports = (app) => {
  const soundlocation = require("../controllers/soundlocation.controller");
  const db = require("../models");
  var router = require("express").Router();

  // Create a new Sound
  router.post("/", soundlocation.create);

  // Retrieve all soundlocation
  router.get("/", soundlocation.findAll);

  /* On peut définir les méthodes ici, ou bien dans
    un fichier séparé, ici : soundlocation.controller.js.
    router.get('/', function(req, res, next) {
        db.SoundLocation.findAll()
        .then((users) => {
            res.json(users);
        }, (err) => next(err))
        .catch((err) => next(err));
    });*/

  // Retrieve all published soundlocation
  router.get("/published", soundlocation.findAllPublished);

  // Retrieve a single Sound with id
  router.get("/:id", soundlocation.findOne);

  // Update a Sound with id
  router.put("/:id", soundlocation.update);

  // Delete a Sound with id
  router.delete("/:id", soundlocation.delete);

  // Delete all soundlocation
  router.delete("/", soundlocation.deleteAll);

  router.get("/getClosestPositions/:id", soundlocation.findClosestPositions);

  app.use("/api/v1/soundlocation", router);
};
