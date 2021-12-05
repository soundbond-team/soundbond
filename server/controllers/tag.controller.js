const db = require("../models");
const sanitizeHtml = require("sanitize-html");
const Tag = db.Tag;
const Op = db.Sequelize.Op;

//Suggestion users
exports.tagSuggestion = (req, res) => {
  const recherche = req.body.tag;

  Tag.findAll({
    where: {
      tag: {
        [Op.startsWith]: "%" + recherche + "%",
      },
    },
    limit: 10,
  })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        err: "Error retrieving User.",
      });
    });
};
