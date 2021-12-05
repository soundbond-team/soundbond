const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post } = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
exports.userInformations = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: [
      {
        model: User,
        as: "follow",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: User,
        as: "following",
        attributes: {
          exclude: ["password"],
        },
      },
    ],
    attributes: {
      exclude: ["password"],
    },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: "Error retrieving User.",
        })
      );
    });
};
exports.userInformations2 = (req, res) => {
  const username = req.params.username;

  User.findOne({
    where: { username },
    include: [
      {
        model: User,
        as: "follow",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: User,
        as: "following",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Post,
        as: "shared_posts",
      },
    ],
    attributes: { exclude: ["password"] },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving User.",
      });
    });
};

exports.updateUser = (req, res) => {
  const id = req.params.id;
  User.update(req.body, {
    where: { id: id },
  })
    .then((num) => {
      if (num == 1) {
        res.send({
          message: "User was updated successfully.",
        });
      } else {
        res.send(
          sanitizeHtml({
            error: `Cannot update User."`,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: "Error updating User.",
        })
      );
    });
};

//follow an user
exports.follow = async (req, res) => {
  const follower = req.params.id;
  const following = req.body.following;
  User.findByPk(following).then(async (user) => {
    try {
      await user.addFollowing(follower);
      res.status(201).json("add follower");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};

//unfollow an user
exports.unfollow = async (req, res) => {
  const follower = req.params.id;
  const following = req.body.following;
  User.findByPk(following).then(async (user) => {
    try {
      await user.removeFollowing(follower);
      res.status(201).json("remove follower");
    } catch (e) {
      res.status(400).json("error");
    }
  });
};

//Suggestion users
exports.userSuggestion = (req, res) => {
  const recherche = req.params.username;

  User.findAll({
    where: {
      username: {
        [Op.startsWith]: "%" + recherche + "%",
      },
    },
    limit: 10,
    include: [
      {
        model: User,
        as: "follow",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: User,
        as: "following",
        attributes: {
          exclude: ["password"],
        },
      },
      {
        model: Post,
        as: "shared_posts",
      },
    ],
    attributes: { exclude: ["password"] },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving User.",
      });
    });
};
