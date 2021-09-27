module.exports = (app) => {
  const soundlocation = require("../controllers/soundlocation.controller");

  var router = require("express").Router();

  // Create a new Sound
  router.post("/", soundlocation.create);

  // Retrieve all soundlocation
  router.get("/", soundlocation.findAll);

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

  app.use("/api/v1/soundlocation", router);
};
