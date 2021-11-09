module.exports = (app) => {
  const userCtrl = require("../controllers/user.controller");
  const authCtrl = require("../controllers/auth.controller");
  const router = require("express").Router();

  //auth
  router.post("/register", authCtrl.signUp);
  router.post("/login", authCtrl.login);
  router.get("/logout", authCtrl.logout);

  //user
  router.get("/:id", userCtrl.userInformations);

  router.get("/username/:username", userCtrl.userInformations2);

  router.post("/follow/:id", userCtrl.follow);
  router.post("/unfollow/:id", userCtrl.unfollow);

  router.put("/:id", userCtrl.updateUser);

  app.use("/api/v1/user", router);
};
