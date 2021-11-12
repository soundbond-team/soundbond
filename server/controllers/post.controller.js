const db = require("../models");
const Op = db.Sequelize.Op;

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

  // Enregistrement dans la base. .create créé et commit dans la base d'un seul coup.
  const postcreate = await db.Post.create(post);

  if (Object.keys(req.body.tags).length > 0) {
    for (let value of Object.values(req.body.tags)) {
      let tagtocreate = await db.tag.create({ tag: value });
      await postcreate.addTag(tagtocreate);
    }
  } else {
    console.log("no tags");
  }

  db.Post.findByPk(postcreate.id, {
    include: [
      {
        model: db.Sound,
        as: "publishing",

        include: [
          {
            model: db.SoundLocation,
            as: "soundlocation",
          },
        ],
      },
      {
        model: db.User,
        as: "publisher",
        attributes: ["id", "username"],
      },
      {
        model: db.User,
        as: "liked_by",
        attributes: ["id", "username"],
      },
      {
        model: db.User,
        as: "commented_by",
        attributes: ["id", "username"],
      },
      { model: db.tag, as: "tag" },
    ],
  }).then((data) => {
    res.send(data);
  });
};

// Retrieve all posts from the database.
exports.findAll = (req, res) => {
  db.Post.findAll({
    include: [
      {
        model: db.Sound,
        as: "publishing",

        include: [
          {
            model: db.SoundLocation,
            as: "soundlocation",
          },
        ],
      },
      {
        model: db.User,
        as: "publisher",
        attributes: ["id", "username"],
      },
      {
        model: db.User,
        as: "liked_by",
        attributes: ["id", "username"],
      },
      {
        model: db.User,
        as: "commented_by",
        attributes: ["id", "username"],
      },

      {
        model: db.tag,
        as: "tag",
      },
    ],
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

// Get all Posts posted by a specific User.
exports.allPostsByUser = (req, res) => {
  db.Post.findAll({
    where: {
      publisher_user_id: req.params.user_id,
    },
    include: [
      {
        model: db.Sound,
        as: "publishing",

        include: [
          {
            model: db.SoundLocation,
            as: "soundlocation",
          },
        ],
      },
      {
        model: db.User,
        as: "publisher",
      },
      {
        model: db.User,
        as: "liked_by",
      },
      {
        model: db.Sound,
        as: "publishing",

        include: [
          {
            model: db.SoundLocation,
            as: "soundlocation",
          },
        ],
      },
      {
        model: db.User,
        as: "commented_by",
        attributes: ["id", "username"],
      },
      { model: db.tag, as: "tag" },
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
  console.log(list_suivis2);
  db.Post.findAll({
    where: {
      publisher_user_id: {
        [Op.in]: list_suivis2,
      },
    },
    include: [
      {
        model: db.Sound,
        as: "publishing",

        include: [
          {
            model: db.SoundLocation,
            as: "soundlocation",
          },
        ],
      },
      {
        model: db.User,
        as: "publisher",
      },
      {
        model: db.User,
        as: "liked_by",
      },
      {
        model: db.User,
        as: "commented_by",
        attributes: ["id", "username"],
      },
      { model: db.tag, as: "tag" },
    ],
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

exports.getAllLike = (req, res) => {
  const id = req.params.id;

  db.Post.findAndCountAll(id)
    .then((data) => {
      data.co;
      console.log(data.like);
      let like = {
        like: data.like,
      };
      res.send(like);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving Post with id=" + id,
      });
    });
};

// Find a single Post with an id
exports.findOne = (req, res) => {
  const id = req.params.id;

  db.Post.findByPk(id, {
    include: [
      {
        model: db.Sound,
        as: "publishing",

        include: [
          {
            model: db.SoundLocation,
            as: "soundlocation",
          },
        ],
      },
      {
        model: db.User,
        as: "publisher",
        attributes: ["id", "username"],
      },
      {
        model: db.User,
        as: "liked_by",
        attributes: ["id", "username"],
      },
      {
        model: db.User,
        as: "commented_by",
        attributes: ["id", "username"],
      },
      { model: db.tag, as: "tag" },
    ],
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving Post with id=" + id,
      });
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
        res.send({
          error: `Cannot update Post with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error updating Post with id=" + id,
      });
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
        res.send({
          error: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Could not delete Post with id=" + id,
      });
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
        error: "Error retrieving Likes for Post with id=" + id,
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
  /* Deuxième solution :

  db.Post.findByPk(req.body.post_id)
    .then((post) => {
      if (!post) {
        res.status(400).json("Post not found");
      } else {
        db.User.findByPk(req.body.user_id).then((user) => {
        if (!user) {
          res.status(400).json("User not found");
        } else {
          try {
            await post.addCommented_by(
              user,
              {through: {comment: req.body.comment_text}}
            )
          } catch (e){
              res.status(400).json("error");
            }
          }
        })
      }
    })*/
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
        error:
          "Error retrieving Comments for Post with id=" + req.params.post_id,
      });
    });
};
// Pagination : voir https://bezkoder.com/node-js-sequelize-pagination-mysql/
