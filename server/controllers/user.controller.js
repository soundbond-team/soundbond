const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const User = db.User;

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
          error: "Error retrieving User with id=" + id,
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
    ],
    attributes: { exclude: ["password"] },
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving User with id=" + id,
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
            error: `Cannot update User with id=${id}. Maybe Post was not found or req.body is empty!`,
          })
        );
      }
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: "Error updating User with id=" + id,
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
