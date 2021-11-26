module.exports = (app) => {
  const playlistCtrl = require("../controllers/playlist.controller");
  const router = require("express").Router();

  //create
  router.post("/create", playlistCtrl.create);

  app.use("/api/v1/playlist", router);
};
