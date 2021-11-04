module.exports = (app) => {
  const userCtrl = require("../controllers/user.controller");
  const authCtrl = require("../controllers/auth.controller");
  const router = require("express").Router();

  //auth
  router.post("/register", authCtrl.signUp);
  router.post("/login", authCtrl.login);
  router.get("/logout", authCtrl.logout);

  //user
  router.get("/",userCtrl.getAllUsers);
  router.get("/:id", userCtrl.userInformations);
  router.put("/:id", userCtrl.updateUser);
  router.post("/follows/:idToFollow",userCtrl.followUser);

  

  app.use("/api/v1/user", router);
};
