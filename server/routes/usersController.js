var bcrypt = require('bcrypt');
var jwtUtils = require('../utils/jwt.utils');
var models = require('../models');


//Route

module.exports = {
    register: function(req, res){

        //params
        var first_name = req.body.first_name;
        var last_name = req.body.last_name;
        var email = req.body.email;
        var password = req.body.password;

        if(first_name == null || last_name == null
            || email == null || password == null){
                return res.status(400).json({'error': 'missing parameters'});

            }
            models.user.findOne({
                attributes: [email],
                where:{email:email}
            })
            .then(function(userFound){
                if(!userFound){

                    bcrypt.hash(password,5,function(err,bcryptedPassword){
                        var newUser = models.user.create({
                            first_name: first_name,
                            last_name: last_name,
                            email: email,
                            password: password,
                            isAdmin:0
                        })
                        .then(function(newUser){
                            return res.status(201).json({
                                'userId': newUser.id
                            })
                        })
                        .catch(function(err){
                            return res.status(500).json({'erroe':'cannot add user'});
                        });
                    });
                }
                else{
                    return res.status(400).json({'error':'user already exist'});
                }

            })
            .catch(function(err){
                return res.status(500).json({'error':'unable to verify user'});
            });
    },
    login: function(req, res){
        var email = req.body.email;
        var password = req.body.password;

        if(email == null || password == null){
            return res.status(400).json({'error':'missing parameters'});
        
        
        }
        models.user.findOne({
            where: {email:email}
        })
        .then(function(userFound){
            if(userFound){

                bcrypt.compare(password,userFound.password,function(errBycrypt,resBycrypt){
                    if(resBycrypt){
                        return res.status(200).json({
                            'userId':userFound.id,
                            'token': jwtUtils.generateTokenForUser(userFound)
                        });
                    }else{
                        return res.status(403).json({'error':'invalid password'});
                    }
                });
            }else{
                return res.status(404).json({'error':'user not exist in BD'});
            }
        })
        .catch(function(err){
            return res.status(500).json({'error':'unable to verify user'});
        });
    }

}