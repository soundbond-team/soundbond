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
    const { user_id } = req.params.idToFollow;
    const  follower_id = req.body.followerId;
    const user = User.findByPk(
      user_id,
      {
        $push:{follows : follower_id}
      },
      {
        new:true,
      }).exec((err,result)=>{
        if(err){
          return res.status(422).json({error:error});
        }else {
          res.json(result);
        }
      });
};



