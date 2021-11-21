module.exports = (app) => {
  const post = require("../controllers/post.controller");
  const router = require("express").Router();

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

  // Likes
  router.post("/like/:id", post.like);
  router.post("/unlike/:id", post.unlike);

  router.get("/getAllLike/:id", post.getAllLike);

  // Comments
  router.post("/comment/", post.comment);
  router.post("/uncomment/", post.uncomment);
  router.get("/:post_id/getAllComments/", post.getAllComments);

  //search by tag
  router.get("/post/:tag", post.getByTag);

  router.get("/getAllPost/:tag", post.getAllPost);

  app.use("/api/v1/post", router);
};
