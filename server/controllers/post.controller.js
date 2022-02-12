const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const Op = db.Sequelize.Op;

/*
 * Helpers
 */

const helper_include_soundlocation = {
  model: db.SoundLocation,
  as: "soundlocation",
};

const helper_include_visited = {
  model: db.User,
  as: "visited_by",
  attributes: ["id", "username"],
};

const helper_sound = {
  model: db.Sound,
  as: "publishing",
  include: [helper_include_soundlocation, helper_include_visited],
};

const helper_user_publisher = {
  model: db.User,
  as: "publisher",
  attributes: ["id", "username"],
};

const helper_user_liked_by = {
  model: db.User,
  as: "liked_by",
  attributes: ["id", "username"],
};

const helper_user_commented_by = {
  model: db.User,
  as: "commented_by",
  attributes: ["id", "username"],
};

const helper_user_shared_by = {
  model: db.User,
  as: "shared_by",
  attributes: ["id", "username"],
};

const helper_tag = {
  model: db.Tag,
  as: "tagpost",
};

const helper_playlist = {
  model: db.Playlist,
  as: "listplaylist",
};

const helper_include_everything = [
  helper_sound,
  helper_user_publisher,
  helper_user_liked_by,
  helper_user_commented_by,
  helper_tag,
  helper_user_shared_by,
  helper_playlist,
];

// Création d'un nouveau Post.
exports.create = async (req, res) => {
  // Vérification que la requête contient bien toutes les valeurs.
  if (
    !req.body.description ||
    !req.body.publisher_user_id ||
    !req.body.sound_id
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }

  // Créer un post à partir des données dans la requête POST.
  const post = {
    description: req.body.description,
    publisher_user_id: req.body.publisher_user_id,
    sound_id: req.body.sound_id,
  };

  const find = () => {
    db.Post.findByPk(postcreate.id, {
      include: helper_include_everything,
    }).then((data) => {
      res.send(data);
    });
  };

  // Enregistrement dans la base. .create créé et commit dans la base d'un seul coup.
  const postcreate = await db.Post.create(post);

  if (Object.keys(req.body.tags).length > 0) {
    for (let value of Object.values(req.body.tags)) {
      //

      db.Tag.findOne({
        where: { tag: value },
      })
        .then(async (data) => {
          if (data != null) {
            await postcreate.addTagpost(data);
            find();
          } else {
            const tagcreated = await db.Tag.create({ tag: value });
            await postcreate.addTagpost(tagcreated);
            find();
          }
        })
        .catch(async (e) => {
          const tagcreated = await db.Tag.create({ tag: value });
          await postcreate.addTagpost(tagcreated);
          find();
        });
    }
  } else {
    find();
  }
};

exports.getTag = (req, res) => {
  const tagParameter = req.body.tag;
  console.log(tagParameter);
  db.Tag.findOne({
    where: { tag: tagParameter },
  })
    .then((data) => {
      if (data.id) {
        res.status(200).send(true);
      } else {
        res.status(200).send(false);
      }
    })
    .catch((err) => {
      res.status(200).send(false);
    });
};

//get all post by tag
exports.getPostByTag = (req, res) => {
  const tagParameter = req.body.tag;
  db.Tag.findOne({
    where: { tag: tagParameter },
    include: [
      {
        model: db.Post,
        as: "tagging",
        include: helper_include_everything,
      },
    ],
  })
    .then((data) => {
      res.status(200).send(data);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {
  db.Post.findAll({
    include: helper_include_everything,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while retrieving post.",
      });
    });
};

exports.allPostsByPublisherUserId = (req, res) => {
  // Get all Posts posted by a specific User.
  db.Post.findAll({
    where: {
      publisher_user_id: req.params.user_id,
    },
    include: helper_include_everything,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while retrieving Posts from user.",
      });
    });
};

async function helper_allPostsByPublishersUserId(users_ids){
  // Create a list of all Posts for user ids speciied in argument.
  let posts = [];
  for (let user_id of users_ids){
    let posts_per_user = await db.Post.findAll({
      where: {
        publisher_user_id: user_id,
      },
      include: helper_include_everything,
    })
    if (posts_per_user.length > 0){
      for (let post of posts_per_user){
        posts.push(post);
      }
    }
  }
  return posts;
}

exports.allPostsByPublishersUserId = (req, res) => {
  /* GET all Posts posted by a set of Users.
  - specify : {"users":[1, 2, 3]} for the posts from users 1, 2 and 3.
  Non-existing users and users without posts will be ignored without any warning message.
  */

  // Vérification que la requête contient bien toutes les valeurs.
  if (
    !req.body.users
  ) {
    res.status(400).send({
      message: "Content can not be empty!",
    });
    return;
  }
  helper_allPostsByPublishersUserId(req.body.users).then((data) => {
    res.send(data);
  })
};

exports.allPostsFromUsersFollowedByUserId = (req, res) => {
  // GET all Posts from users followed by a speficific User.
  db.User.findAll({
    where: {
      follower_id: req.params.user_id,
    },
    include: helper_include_everything,
  })
  .then((data) => {
    res.send(data);
  })
  .catch((err) => {
    res.status(500).send({
    error: err.message || "Some error occurred while retrieving Posts from followings.",
    });
  });
};
  
exports.trendingPostsForSpecificUser = async (req, res) => {
  const user_id = req.params.user_id;
  const list_suivis = await db.User.findAll({
    include: {
      model: db.User,
      as: "following",
      where: {
        id: user_id,
      },
    },
  });
  let list_suivis2 = list_suivis.map((x) => x.id);
  db.Post.findAll({
    where: {
      publisher_user_id: {
        [Op.in]: list_suivis2,
      },
    },
    include: helper_include_everything,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while retrieving trending post for that user.",
      });
    });
};

exports.allPostsSharedByUser = (req, res) => {
  let id = req.params.user_id;
  db.User.findByPk(id, {
    include: [
      {
        model: db.Post,
        as: "shared_posts",
        include: helper_include_everything,
      },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while retrieving Posts.",
      });
    });
};

exports.getAllLike = (req, res) => {
  const id = req.params.id;

  db.Post.findAndCountAll(id)
    .then((data) => {
      let like = {
        like: data.like,
      };
      res.send(like);
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: "Error retrieving Post.",
        })
      );
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.Post.findByPk(id, {
    include: helper_include_everything,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: "Error retrieving Post.",
        })
      );
    });
};

// Update a Post by the id in the request
exports.update = (req, res) => {
  const id = req.params.id;

  db.Post.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was updated successfully.",
        });
      } else {
        res.send(
          sanitizeHtml({
            error: `Cannot update Post.`,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: "Error updating Post.",
        })
      );
    });
};

// Delete a Post with the specified id in the request
exports.delete = (req, res) => {
  const id = req.params.id;

  db.Post.destroy({
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "Post was deleted successfully!",
        });
      } else {
        res.send(
          sanitizeHtml({
            error: `Cannot delete Post.`,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: "Could not delete Post.",
        })
      );
    });
};

// Delete all Posts from the database.
exports.deleteAll = (req, res) => {
  db.Post.destroy({
    where: {},
    truncate: false,
  })
    .then((nums) => {
      res.send({ message: `${nums} Posts were deleted successfully!` });
    })
    .catch((err) => {
      res.status(500).send({
        error: err.message || "Some error occurred while removing all post.",
      });
    });
};

// Like a post
exports.like = async (req, res) => {
  const id = req.params.id;
  const user_id = req.body.user_id;
  db.Post.findByPk(id).then(async (post) => {
    try {
      await post.addLiked_by(user_id);
      res.status(201).json("liked");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};

// Dislike a post
exports.unlike = async (req, res) => {
  const id = req.params.id;
  const user_id = req.body.user_id;
  db.Post.findByPk(id).then(async (post) => {
    try {
      await post.removeLiked_by(user_id);
      res.status(201).json("unliked");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};

// Get all the likes for a specific post
exports.getAllLike = (req, res) => {
  const id = req.params.id;

  db.Post.findAndCountAll(id)
    .then((data) => {
      let like = {
        like: data.like,
      };
      res.send(like);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving Likes for Post",
      });
    });
};

// Comment a post
exports.comment = async (req, res) => {
  //! Impossible d'avoir plus d'un commentaire associant le même couple (user, post) : https://github.com/sequelize/sequelize/issues/3493
  // We insert the row, and then we look for it in the database to return it under JSON format.
  try {
    const post = await db.Post.findByPk(req.body.post_id);
    const user = await db.User.findByPk(req.body.user_id);
    await post.addCommented_by(user, {
      through: { comment: req.body.comment_text },
    });
    db.Comments.findOne({
      where: { post_id: req.body.post_id, user_id: req.body.user_id },
    }).then((data) => {
      res.status(201).json(data);
    });
  } catch (e) {
    res.status(400).json("error");
  }
};

// Delete a comment from a post
exports.uncomment = async (req, res) => {
  /* Avec l'id d'un post et l'id d'un user, supprime le commentaire correspondant. */
  const post_id = req.body.post_id;
  const user_id = req.body.user_id;
  db.Post.findByPk(post_id).then(async (post) => {
    try {
      await post.removeCommented_by(user_id);
      res.status(201).json("comment deleted");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};

// Get all the comments for a specific post
exports.getAllComments = (req, res) => {
  db.Comments.findAll({
    where: { post_id: req.params.post_id },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving Comments for Post.",
      });
    });
};

// Pagination : voir https://bezkoder.com/node-js-sequelize-pagination-mysql/

exports.share = async (req, res) => {
  const post_id = req.body.post_id;
  const user_id = req.body.user_id;

  db.Post.findByPk(post_id).then(async (post) => {
    try {
      await post.addShared_by(user_id);
      res.status(201).json("shared");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};
exports.unshare = async (req, res) => {
  const post_id = req.body.post_id;
  const user_id = req.body.user_id;

  db.Post.findByPk(post_id).then(async (post) => {
    try {
      await post.removeShared_by(user_id);
      res.status(201).json("unshared");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};
