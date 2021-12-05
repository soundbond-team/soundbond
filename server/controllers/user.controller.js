const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post } = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

const MESSAGE_FIND_ERROR = "Error retrieving User.";
const MESSAGE_UPDATE_ERROR = "Error updating User.";

const helper_include_followings_followers = [
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
];
const helper_exclude_password = {
  exclude: ["password"],
};

exports.userInformations = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, {
    include: helper_include_followings_followers,
    attributes: helper_exclude_password,
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: MESSAGE_FIND_ERROR,
        })
      );
    });
};
exports.userInformations2 = (req, res) => {
  const username = req.params.username;

  User.findOne({
    where: { username },
    include: helper_include_followings_followers,
    attributes: helper_exclude_password
    })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: MESSAGE_FIND_ERROR,
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
            error: MESSAGE_UPDATE_ERROR,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: MESSAGE_UPDATE_ERROR,
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
    include: helper_include_followings_followers,
    attributes: helper_exclude_password
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: MESSAGE_FIND_ERROR,
      });
    });
};
