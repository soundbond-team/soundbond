const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post, sequelize, Sequelize } = require("../models");
const QueryTypes = db.Sequelize.QueryTypes;
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

exports.mostListened = async (req, res) => {
  try{
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query("SELECT strftime('%Y',v.createdAt) as year, u.username, count(u.username) as apparition \
    FROM Users u, Sounds s, Visits v \
    WHERE s.id=v.sound_id AND s.uploader_user_id=u.id AND v.user_id=:id_user AND year=strftime('%Y',DATE())  \
    GROUP BY u.username ORDER BY apparition ASC",
    {
      replacements : {
        id_user: req.params.id
      },
      type: QueryTypes.SELECT
    })
    res.json(favs);
  }
  catch(err){
    console.log(err);
  }
}

exports.timeListening = async (req, res) => {
  try{
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query("SELECT strftime('%d',v.createdAt) as day, SUM(s.duration) as duree FROM Sounds s, Visits v\
    WHERE s.id=v.sound_id AND v.user_id=:id_user and day=strftime('%d',DATE())",
    {
      replacements : {
        id_user: req.params.id
      },
      type: QueryTypes.SELECT
    })
    res.json(favs);
  }
  catch(err){
    console.log(err);
  }
}

exports.bestTags = async (req, res) => {
  try{
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query('SELECT t.tag, count(t.tag) as apparition FROM Tags t, Tag_Post tp, Posts p\
    WHERE t.id=tp.tagging_id AND tp.post_id=p.id',
    {
      type: QueryTypes.SELECT
    })
    res.json(favs);
  }
  catch(err){
    console.log(err);
  }
}

exports.numberPost = async (req, res) => {
  try{
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query("SELECT strftime('%m',p.createdAt) as month, u.username, count(p.id) as nbPost FROM Users u, Posts p\
    WHERE p.publisher_user_id=u.id and u.id=:id_user\
    GROUP BY month",
    {
      replacements : {
        id_user: req.params.id
      },
      type: QueryTypes.SELECT
    })
    res.json(favs);
  }
  catch(err){
    console.log(err);
  }
}

exports.numberPostByMonth = async (req, res) => {
  try{
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query("SELECT strftime('%m',p.createdAt) as month, u.username, count(p.id) as nbPost FROM Users u, Posts p\
    WHERE p.publisher_user_id=u.id and u.id=:id_user and strftime('%Y',p.createdAt)=strftime('%Y',DATE())\
    GROUP BY month",
    {
      replacements : {
        id_user: req.params.id
      },
      type: QueryTypes.SELECT
    })
    res.json(favs);
  }
  catch(err){
    console.log(err);
  }
}

exports.numberLikeByMonth = async (req, res) => {
  try{
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query("SELECT strftime('%m',p.createdAt) as month, count(p.id) as nbLike FROM Posts p, Likes l, Users u\
    WHERE p.like=1 AND p.id=l.post_id AND l.user_id=u.id AND u.id=:id_user\
    GROUP BY month",
    {
      replacements : {
        id_user: req.params.id
      },
      type: QueryTypes.SELECT
    })
    res.json(favs);
  }
  catch(err){
    console.log(err);
  }
}

exports.numberFollowersByMonth = async (req, res) => {
  try{
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query("SELECT strftime('%m',a.createdAt) as month, count(u.id) as nbFollowers FROM Abonnement a, Users u\
    WHERE a.follower_id=u.id AND u.id=:id_user and month=strftime('%m',DATE())\
    GROUP BY month",
    {
      replacements : {
        id_user: req.params.id
      },
      type: QueryTypes.SELECT
    })
    res.json(favs);
  }
  catch(err){
    console.log(err);
  }
}