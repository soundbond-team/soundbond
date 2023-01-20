module.exports = (app) => {
  const post = require("../controllers/post.controller");
  const router = require("express").Router();

  // Create a new Post
  router.post("/", post.create);

  // Retrieve all Post
  router.get("/", post.findAll);

  // Retrieve all Post map
  router.get("/map", post.findAllformap);

  // Retrieve a single Post with id
  router.get("/:id", post.findOne);

  // Update a Post with id
  router.put("/:id", post.update);

  // Delete a Post with id
  router.delete("/:id", post.delete);

  // Delete all Post
  router.delete("/", post.deleteAll);

  //check if tag exist
  router.post("/getTag/", post.getTag);

  // Likes
  router.post("/like/:id", post.like);
  router.post("/unlike/:id", post.unlike);

  router.get("/getAllLike/:id", post.getAllLike);

  // Comments
  router.post("/comment/", post.comment);
  router.post("/uncomment/", post.uncomment);
  router.get("/:post_id/getAllComments/", post.getAllComments);

  //search by tag
  router.post("/getPostByTag/", post.getPostByTag);
  //shares
  router.post("/share/", post.share);
  router.post("/unshare/", post.unshare);

  router.post("/save/", post.save);
  router.post("/unsave/", post.unsave);

  app.use("/api/v1/post", router);
};
