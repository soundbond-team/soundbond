module.exports = (app) => {
  const sound = require("../controllers/sound.controller");

  const router = require("express").Router();

  // Create a new Sound
  router.post("/", sound.create);

  // Retrieve all sound
  router.get("/", sound.findAll);

  // Retrieve a single Sound with id
  router.get("/:id", sound.findOne);

  // Update a Sound with id
  router.put("/:id", sound.update);

  // Delete a Sound with id
  router.delete("/:id", sound.delete);

  // Delete all sound
  router.delete("/", sound.deleteAll);

  // visits
  router.post("/visit/:id", sound.visit);

  router.get("/visit/length/:id", sound.getVisitLength);

  app.use("/api/v1/sound", router);
};
