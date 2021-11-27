const user = require("../models/user");

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
  router.get("/:id", userCtrl.userInformations);

  // GET all Posts posted by a specific User.
  router.get("/:user_id/posts", post.allPostsByUser);
  // GET all Trending Posts for a specific User.
  router.get("/:user_id/trending/", post.trendingPostsForSpecificUser);

  //GET all posts shared by a specific user
  router.get("/:user_id/sharedPosts", post.allPostsSharedByUser);

  router.get("/username/:username", userCtrl.userInformations2);

  router.get("/recherche/:username", userCtrl.userSuggestion);

  router.post("/follow/:id", userCtrl.follow);
  router.post("/unfollow/:id", userCtrl.unfollow);

  //GET all Posts shared by a specific User.

  router.put("/:id", userCtrl.updateUser);

  app.use("/api/v1/user", router);
};
