module.exports = (app) => {
  const file = require("../controllers/file.controller");

  const router = require("express").Router();

  // Create a new Sound
  router.post("/", file.upload);
  router.post("/uploadML", file.uploadML);

  app.use("/api/v1/file", router);
};
