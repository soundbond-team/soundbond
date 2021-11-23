module.exports = (app) => {
  const blob = require("../controllers/blob.controller");
  const router = require("express").Router();

  // Obtenir la liste des containers.
  router.get("/containers", blob.containers);

  // Charger "hello world" sur un BLOB
  router.get("/create", blob.create);

  // Lister les BLOBS
  router.get("/list", blob.list_blobs);

  // Obtenir un blob.
  router.get("/get", blob.get_blob);

  app.use("/api/v1/blob", router);
};
  