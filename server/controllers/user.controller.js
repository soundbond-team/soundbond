const db = require("../models");
const User = db.User;
const Op = db.Sequelize.Op;
const bcrypt = require('bcrypt');


//create a new user account
exports.signup = (req, res) => {
  
       bcrypt.hash(req.body.password, 10)
       //hash the password before storing it in the database
      .then(hash => {
        const user = User.create({
          id:null,
          username : req.body.username,
          password: hash
        });
        user.save()
          .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
          .catch(error => res.status(400).json({ error }));
      })
      .catch(error => res.status(500).json({ error }));
};


//login into a user account 
exports.login = (req, res, next) => {
  User.findOne({where :{username: req.body.username }})
    .then(user => {
      if (!user) {
        return res.json({ loggedIn : false, message: 'Utilisateur non trouvé !' });
      }
      //compare the existant password and the one typed by the user
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.json({ loggedIn : false, message: 'Mot de passe incorrect !' });
          }
          res.status(200).json({
            loggedIn: true,
            username: user.username,
            id_user :  user.id,
            message : "welcome back",
            token: 'TOKEN'
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({error }));
};

