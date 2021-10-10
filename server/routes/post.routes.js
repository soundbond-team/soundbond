module.exports = (app) => {
  const post = require("../controllers/post.controller");
  var router = require("express").Router();

  // Create a new Post
  router.post("/", post.create);

  // Retrieve all post
  //router.get("/", post.findAll);

  // Retrieve all published post
  //router.get("/published", post.findAllPublished);

  // Retrieve a single Post with id
  //router.get("/:id", post.findOne);

  // Update a Post with id
  //router.put("/:id", post.update);

  // Delete a Post with id
  //router.delete("/:id", post.delete);

  // Delete all post
  //router.delete("/", post.deleteAll);

  app.use("/api/v1/post", router);
};
