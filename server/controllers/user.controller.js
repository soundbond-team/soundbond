const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const { Post, sequelize, Sequelize } = require("../models");
const { QueryTypes } = require("sequelize");
//const QueryTypes = db.Sequelize.QueryTypes;
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

/**
 * Cette fonction permet de récupérer pour un compte les 3 utilisateurs les plus écoutés
 */
exports.mostListened = async (req, res) => {
  try {
    /*const favs = await db.sequelize.query("SELECT strftime('%Y',v.createdAt) as year, u.username, count(v.nbVisit) as apparition \
    FROM Users u, Sounds s, Visits v \
    WHERE s.id=v.sound_id AND s.uploader_user_id=u.id AND v.user_id=:id_user AND year=strftime('%Y',DATE())  \
    GROUP BY u.username ORDER BY apparition ASC",*/
    const favs = await db.sequelize.query(
      "SELECT DATEPART(yyyy,v.createdAt) AS year, u.username, count(u.username) AS apparition \
      FROM Users u, Sounds s, Visits v \
      WHERE s.id=v.sound_id AND s.uploader_user_id=u.id AND v.user_id=:id_user AND s.uploader_user_id!=:id_user AND DATEPART(yyyy,v.createdAt)=DATEPART(yyyy,GETDATE())  \
      GROUP BY u.username, DATEPART(yyyy,v.createdAt) ORDER BY apparition DESC, u.username OFFSET 0 ROWS \
      FETCH NEXT 3 ROWS ONLY",
      {
        replacements: {
          id_user: req.params.id,
        },
        type: QueryTypes.SELECT,
      }
    );
    res.json(favs);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Cette fonction permet de récupérer le temps qu'il a passsé à écouter des audios durant un timelaps(jour, mois, année)
 */
exports.timeListening = async (req, res) => {
  try {
    //!AJOUTER DES COMMENTAIRES
    const type = req.params.typeDate;
    let cond = "";
    let select = "";

    switch (type) {
      case "d":
        cond =
          "DATEPART(yyyy,v.createdAt)=DATEPART(yyyy,GETDATE()) AND DATEPART(mm,v.createdAt)=DATEPART(mm,GETDATE()) AND DATEPART(dd,v.createdAt)=DATEPART(dd,GETDATE())";
        select = "FORMAT (GETDATE(), 'dd/MM/yyyy')";
        break;
      case "m":
        cond = "DATEPART(yyyy,v.createdAt)=DATEPART(yyyy,GETDATE()) AND DATEPART(mm,v.createdAt)=DATEPART(mm,GETDATE())";
        select = "FORMAT (GETDATE(), 'MM/yyyy')";
        break;
      case "y": 
        cond = "DATEPART(yyyy,v.createdAt)=DATEPART(yyyy,GETDATE())";
        select = "FORMAT (GETDATE(), 'yyyy')";
        break;
      default:
        break;
    }
    const favs = await db.sequelize.query(
      "SELECT " +
        select +
        " as date, SUM(s.duration) as duree FROM Sounds s, Visits v\
        WHERE s.id=v.sound_id AND v.user_id=:id_user and " +
        cond,
      {
        replacements: {
          id_user: req.params.id,
        },
        type: QueryTypes.SELECT,
      }
    );
    res.json(favs);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Cette fonction permet de récupérer les tags les plus utilisés durant le mois courant
 */
exports.bestTags = async (req, res) => {
  try {
    const bestTags = await db.sequelize.query("SELECT t.tag, count(tp.tagging_id) as apparition FROM Tags t, Tag_Post tp, Posts p\
      WHERE t.id=tp.tagging_id AND tp.post_id=p.id AND DATEPART(mm,p.createdAt)=DATEPART(mm, GETDATE()) AND DATEPART(yy,p.createdAt)=DATEPART(yy, GETDATE()) \
      GROUP BY tp.tagging_id, t.tag ORDER BY apparition DESC",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(bestTags);
  } catch (err) {
    console.log(err);
  }
};

/**
 * Cette fonction permet de récupérer le nombre de postés publiés 
 * au cours de chaque mois de l'année courante
 */
exports.numberPostByMonth = async (req, res) => {
  try {
    //!AJOUTER DES COMMENTAIRES
    const nbPost = await db.sequelize.query(
      "SELECT (MONTH(p.createdAt)) as month, count(p.id) as nbPost FROM Users u, Posts p \
      WHERE p.publisher_user_id=u.id and u.id=:id_user and YEAR(p.createdAt)=YEAR(GETDATE()) \
      GROUP BY (MONTH(p.createdAt))",
      {
        replacements: {
          id_user: req.params.id,
        },
        type: QueryTypes.SELECT,
      }
    );
    res.json(nbPost);
  } catch (err) {
    console.log(err);
  }
};

exports.numberLikeByMonth = async (req, res) => {
  try {
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query(
      "SELECT (MONTH(p.createdAt)-1) as month, count(p.id) as nbLike FROM Posts p, Likes l, Users u\
      WHERE p.like=1 AND p.id=l.post_id AND l.user_id=" +
        req.params.id +
        " AND u.id=" +
        req.params.id +
        "\
      GROUP BY MONTH(p.createdAt)",
      {
        type: QueryTypes.SELECT,
      }
    );
    res.json(favs);
  } catch (err) {
    console.log(err);
  }
};

exports.numberFollowersByMonth = async (req, res) => {
  try {
    //!AJOUTER DES COMMENTAIRES
    const favs = await db.sequelize.query(
      "SELECT MONTH(a.createdAt) as month, count(u.id) as nbFollowers FROM Abonnement a, Users u\
      WHERE a.follower_id=u.id AND u.id=@id_user and month=MONTH(GETDATE())\
      GROUP BY MONTH(p.createdAt)",
      {
        replacements: {
          id_user: req.params.id,
        },
        type: QueryTypes.SELECT,
      }
    );
    res.json(favs);
  } catch (err) {
    console.log(err);
  }
};
