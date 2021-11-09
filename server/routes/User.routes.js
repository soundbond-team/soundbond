module.exports = (app) => {
  const userCtrl = require("../controllers/user.controller");
  const authCtrl = require("../controllers/auth.controller");
  const post = require("../controllers/post.controller");
  const router = require("express").Router();

  //auth
  router.post("/register", authCtrl.signUp);
  router.post("/login", authCtrl.login);
  router.get("/logout", authCtrl.logout);

  //user
  router.get("/",userCtrl.getAllUsers);
  router.get("/:id", userCtrl.userInformations);

  // GET all Posts posted by a specific User.
  router.get("/:user_id/posts", post.allPostsByUser);

  router.get("/username/:username", userCtrl.userInformations2);

  router.post("/follow/:id", userCtrl.follow);
  router.post("/unfollow/:id", userCtrl.unfollow);

  router.put("/:id", userCtrl.updateUser);
  router.post("/follows/:idToFollow",userCtrl.followUser);

  

  app.use("/api/v1/user", router);
};
