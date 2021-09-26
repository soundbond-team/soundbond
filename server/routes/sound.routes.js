module.exports = (app) => {
  const sounds = require("../controllers/sound.controller.js");

  var router = require("express").Router();

  // Create a new Sound
  router.post("/", sounds.create);

  // Retrieve all sounds
  router.get("/", sounds.findAll);

  // Retrieve all published sounds
  router.get("/published", sounds.findAllPublished);

  // Retrieve a single Sound with id
  router.get("/:id", sounds.findOne);

  // Update a Sound with id
  router.put("/:id", sounds.update);

  // Delete a Sound with id
  router.delete("/:id", sounds.delete);

  // Delete all sounds
  router.delete("/", sounds.deleteAll);

  app.use("/api/sounds", router);
};
