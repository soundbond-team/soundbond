const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post } = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;

const MESSAGE_FIND_ERROR = "Error retrieving User.";
const MESSAGE_UPDATE_ERROR = "Error updating User.";

const helper_exclude_password_and_dates = {
  exclude: ["password", "createdAt", "updatedAt"],
};

const helper_include_followings_followers = [
  {
    model: User,
    as: "follow",
    attributes: helper_exclude_password_and_dates,
  },
  {
    model: User,
    as: "following",
    attributes: helper_exclude_password_and_dates,
  },
];

exports.userInformations = (req, res) => {
  const user_id = req.params.user_id;

  User.findByPk(user_id, {
    include: helper_include_followings_followers,
    attributes: helper_exclude_password_and_dates,
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
    attributes: helper_exclude_password_and_dates,
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
  const user_id = req.params.user_id;
  User.update(req.body, {
    where: { id: user_id },
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
  const follower = req.params.user_id;
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
  const follower = req.params.user_id;
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
    attributes: helper_exclude_password_and_dates,
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

exports.followings = (req, res) => {
  //TODO Si possible, trouver un moyen d'exclure " abonnement " pour n'avoir que les user_ids des followings.
  const user_id = req.params.user_id;

  User.findByPk(user_id, {
    include: [
      {
        model: User,
        as: "following",
        attributes: ["id", "username"],
      },
    ],
    attributes: [],
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

exports.suggestionsFollow = (req, res) => {
  //TODO Si possible, trouver un moyen d'exclure " abonnement " pour n'avoir que les user_ids des followings.
  const user_id = req.params.id;

  User.findByPk(user_id, {
    include: [
      {
        model: User,
        as: "follow",
      },
    ],
    attributes: [],
  })
    .then(async (data) => {
      let suggestions = [];

      if (Object.keys(data.follow).length > 0) {
        for (let value of Object.values(data.follow)) {
          await User.findByPk(value.id, {
            include: [
              {
                model: User,
                as: "follow",
              },
            ],
          }).then((data2) => {
            if (Object.keys(data2.follow).length > 0) {
              let compteur = 0;
              for (let value2 of Object.values(data2.follow)) {
                for (let value of Object.values(data.follow)) {
                  if (value.id === value2.id) {
                    compteur = compteur + 1;
                  }
                }
                if (compteur == 0 && value2.id != user_id) {
                  suggestions.push(value2);
                }
                compteur = 0;
              }
            }
          });
        }
      }
      res.send(suggestions);
    })
    .catch((err) => {
      res.status(500).send(
        sanitizeHtml({
          error: MESSAGE_FIND_ERROR,
        })
      );
    });
};

exports.mostListened = (req, res) => {
  const user_id = req.params.id;
  //!AJOUTER DES COMMENTAIRES
  User.findAll({
    //attributes: [id, username], 
    include: [
      {
        model: db.Sound,
        as: "les_sons",
        include:[{
          model: db.Visit, 
          as: "les_visites", 
          where: {
            user_id : user_id
          }
        }]
      },
    ]
  }).then(data => res.status(200).send(data));
}
