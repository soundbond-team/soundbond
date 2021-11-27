module.exports = (app) => {
  const tagCtrl = require("../controllers/tag.controller");
  const router = require("express").Router();

  router.post("/recherche", tagCtrl.tagSuggestion);

  app.use("/api/v1/tag", router);
};
