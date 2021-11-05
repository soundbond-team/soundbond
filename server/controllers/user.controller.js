const db = require("../models");
const { Op } = require("sequelize");

const User = db.User;
const Follow = require("../models/follow");

exports.userInformations = (req, res) => {
  const id = req.params.id;

  User.findByPk(id, { attributes: { exclude: ["password"] } })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error retrieving User with id=" + id,
      });
    });
};


exports.getAllUsers = (req,res)=>{
  //const currentUserId = req.params.id;
  User.findAll({ attributes: { exclude: ["password"] } }).then((data)=>{
    console.log(data);
    res.send(data);
  })
  .catch((err)=>{
    res.status(500).send({
      error : " Some error occurred while retrievinf user ."
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
        res.send({
          error: `Cannot update User with id=${id}. Maybe Post was not found or req.body is empty!`,
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        error: "Error updating User with id=" + id,
      });
    });
};



exports.followUser = async(req,res) => {
    const  user_id  = req.params.idToFollow;
    const  follower_id = req.body.followerId;
    const user =  User.findByPk(user_id);


    //verifier l'existence du user à suivre

    if (!user)
      return res.status(404).send({ message: "User not found" });

    if (user.id === follower_id)
      return res.status(400).send({ message: "self following isn't allowed" });

    //chercher un record follows entre les deux users

    const follow = Follow.findOrCreate({
      where: { [Op.and]: [{ user_to: user.id }, { user_from: follower_id }] }
    });

    //supprimer le record s'il existe 
    //sinon ajouter le record 
    if (follow==null || follow==undefined) {
      Follow.create({
        user_from: follower_id,
        user_to: user.id
      });
      return res.send();
    } else {
      Follow.destroy({
        where :{
          user_from:follower_id,
        }
      });
      
      return res.send();
    }
  
};



