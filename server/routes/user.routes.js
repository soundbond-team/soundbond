const user = require("../models/user");

module.exports = (app) => {
  const userCtrl = require("../controllers/user.controller");
  const authCtrl = require("../controllers/auth.controller");
  const post = require("../controllers/post.controller");
  const playlistCtrl = require("../controllers/playlist.controller");
  const router = require("express").Router();

  //auth
  router.post("/register", authCtrl.signUp);
  router.post("/login", authCtrl.login);
  router.get("/logout", authCtrl.logout);

  //user
  router.get("/:user_id", userCtrl.userInformations);

  // GET all Posts posted by a specific User.
  router.get("/:user_id/posts", post.allPostsByPublisherUserId);
  // GET all Posts posted by a set of Users.
  router.post("/posts", post.allPostsByPublishersUserId);
  // GET all Trending Posts for a specific User.
  router.get("/:user_id/trending/", post.trendingPostsForSpecificUser);

  // GET all Posts from users followed by a speficific User.
  router.get(
    "/:user_id/following_posts/",
    post.allPostsFromUsersFollowedByUserId
  );

  // GET all Users followed by a specify User.
  router.get("/:user_id/followings/", userCtrl.followings);

  //GET all posts shared by a specific user
  router.get("/:user_id/sharedPosts", post.allPostsSharedByUser);

  router.get("/:user_id/savedPosts", post.allPostsSavedByUser);

  router.get("/:user_id/history", playlistCtrl.history);
  router.post("/:user_id/history/add", playlistCtrl.history_add);

  router.get("/username/:username", userCtrl.userInformations2);

  router.get("/recherche/:username", userCtrl.userSuggestion);

  router.post("/follow/:user_id", userCtrl.follow);
  router.post("/unfollow/:user_id", userCtrl.unfollow);

  router.put("/:user_id", userCtrl.updateUser);

  router.get("/:id/suggestionsFollow/", userCtrl.suggestionsFollow);

  router.get("/:id/stats/mostListened/", userCtrl.mostListened);
  router.get("/:id/stats/timeListening/:typeDate", userCtrl.timeListening);
  router.get("/stats/tags/", userCtrl.bestTags);
  router.get("/:id/stats/number_post/", userCtrl.numberPostByMonth);
  router.get("/:id/stats/number_likes/", userCtrl.numberLikeByMonth);
  router.get("/:id/stats/number_followers/", userCtrl.numberFollowersByMonth);

  app.use("/api/v1/user", router);
};
