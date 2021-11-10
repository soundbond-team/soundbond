module.exports = (app) => {
  const post = require("../controllers/post.controller");
  const router = require("express").Router();

  // Create a new Post
  router.post("/", post.create);

  // Retrieve all Post
  router.get("/", post.findAll);

  // Retrieve all Post (pour un user)
  router.get("/:id", post.findAll2);

  // Retrieve a single Post with id
  router.get("/:id", post.findOne);

  // Update a Post with id
  router.put("/:id", post.update);

  // Delete a Post with id
  router.delete("/:id", post.delete);

  // Delete all Post
  router.delete("/", post.deleteAll);

  router.post("/like/:id", post.like);

  router.post("/unlike/:id", post.unlike);

  router.get("/trend/:id", post.trend);

  router.get("/getAllLike/:id", post.getAllLike);

  app.use("/api/v1/post", router);
};
