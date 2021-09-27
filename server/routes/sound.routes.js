module.exports = (app) => {
  const sound = require("../controllers/sound.controller");

  var router = require("express").Router();

  // Create a new Sound
  router.post("/", sound.create);

  // Retrieve all sound
  router.get("/", sound.findAll);

  // Retrieve all published sound
  router.get("/published", sound.findAllPublished);

  // Retrieve a single Sound with id
  router.get("/:id", sound.findOne);

  // Update a Sound with id
  router.put("/:id", sound.update);

  // Delete a Sound with id
  router.delete("/:id", sound.delete);

  // Delete all sound
  router.delete("/", sound.deleteAll);

  app.use("/api/v1/sound", router);
};
