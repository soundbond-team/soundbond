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

<<<<<<< HEAD
  //search by tag
  router.get("/getPostByTag/:tag", post.getPostByTag);
=======
  //shares
  router.post("/share/", post.share);
  
 

>>>>>>> 99646c511894ed04684e8a4ce54470cf68a14900

  app.use("/api/v1/post", router);
};
