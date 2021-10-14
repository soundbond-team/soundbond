module.exports = (app) => {
  const post = require("../controllers/post.controller");
  var router = require("express").Router();

  // Create a new Post
  router.post("/", post.create);

  // Retrieve all Post
  router.get("/", post.findAll);

  // Retrieve a single Post with id
  router.get("/:id", post.findOne);

  // Update a Post with id
  router.put("/:id", post.update);

  // Delete a Post with id
  router.delete("/:id", post.delete);

  // Delete all Post
  router.delete("/", post.deleteAll);

  router.get("/getAllLike/:id", post.getAllLike);

  app.use("/api/v1/post", router);
};
