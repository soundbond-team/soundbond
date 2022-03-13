module.exports = (app) => {
  const playlistCtrl = require("../controllers/playlist.controller");
  const router = require("express").Router();

  //create
  router.post("/create", playlistCtrl.create);
  router.post("/add", playlistCtrl.addTitlesToPlaylist);
  router.get("/findAll/:user_id", playlistCtrl.findallForUser);
  app.use("/api/v1/playlist", router);
};
