var models = require('../models');
var asynclib = require('async');


module.exports = {
    likePost: function(req, res){
        const userId = localStorage.getItem(id_user);

        //params
        var postId = parseInt(req.query.postId);
        if(postId <= 0){
            return res.status(400).json({'error': 'invalid parametre'});
        }
        asynclib.waterfall([
            function(done){
                models.post.findOne({
                    where:{id:postId}
                })
                .then(function(postFound){
                    done(null,postFound);
                })
                .catch(function(err){
                    return res.status(500).json({'error':'unable to verify'});
                });
            },
            function(postFound, done){
                if(postFound){
                    models.user.findOne({
                        where:{id:userId}
                    })
                    .then(function(userFound) {
                        done(null, postFound, userFound);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify user'});
                    });
                }else{
                    res.statuts(404).json({'error':'post already liked'});
                }
            },
            function(postFound, userFound, done){
                if(userFound){
                    models.like.findOne({
                        where: {
                            userId: userId,
                            postId: postId
                        }
                    })
                    .then(function(isUserAlreadyLiked){
                        done(null, postFound, userFound, isUserAlreadyLiked);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify is user already liked'});
                    });
                }else{
                    res.status(404).json({'error':'user not exist'});
                }
            },
            function(postFound, userFound, isUserAlreadyLiked,done){
                if(!isUserAlreadyLiked){
                    postFound.addUser(userFound)
                    .then(function(alreadyLikeFound){
                        done(null, postFound, userFound, isUserAlreadyLiked);
                    
                    })
                    .catch(function(err){
                        return res.status(500).json({'error': 'unable to set user reaction'});

                    });
                }else{
                    res.status(409).json({'error':'message elready liked'});
                }
            },
            function(postFound, userFound, done){
                postFound.update({
                    likes:postFound.likes + 1,
                }).then(function(){
                    done(postFound);
                }).catch(function(err){
                    res.status(500).json({'error':'cannot update message like counter'});
                });
            },
        ], function(postFound){
            if(postFound){
                return res.status(201).json(postFound);
            }else{
                return res.status(500).json({'error':'cannot update message'});
            }
        });
    },

    
    dislikePost: function(req,res){
        asynclib.waterfall([
            function(done){
                models.post.findOne({
                    where:{id:postId}
                })
                .then(function(postFound){
                    done(null,postFound);
                })
                .catch(function(err){
                    return res.status(500).json({'error':'unable to verify'});
                });
            },
            function(postFound, done){
                if(postFound){
                    models.user.findOne({
                        where:{id:userId}
                    })
                    .then(function(userFound) {
                        done(null, postFound, userFound);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify user'});
                    });
                }else{
                    res.statuts(404).json({'error':'post already liked'});
                }
            },
            function(postFound, userFound, done){
                if(userFound){
                    models.like.findOne({
                        where: {
                            userId: userId,
                            postId: postId
                        }
                    })
                    .then(function(isUserAlreadyLiked){
                        done(null, postFound, userFound, isUserAlreadyLiked);
                    })
                    .catch(function(err){
                        return res.status(500).json({'error':'unable to verify is user already liked'});
                    });
                }else{
                    res.status(404).json({'error':'user not exist'});
                }
            },
            function(postFound, userFound, isUserAlreadyLiked,done){
                if(!isUserAlreadyLiked){
                    isUserAlreadyLiked.destroy()
                    .then(function(alreadyLikeFound){
                        done(null, postFound, userFound, isUserAlreadyLiked);
                    
                    })
                    .catch(function(err){
                        return res.status(500).json({'error': 'unable to set user reaction'});

                    });
                }else{
                    res.status(409).json({'error':'message elready liked'});
                }
            },
            function(postFound, userFound, done){
                postFound.update({
                    likes:postFound.likes - 1,
                }).then(function(){
                    done(postFound);
                }).catch(function(err){
                    res.status(500).json({'error':'cannot update message like counter'});
                });
            },
        ], function(postFound){
            if(postFound){
                return res.status(201).json(postFound);
            }else{
                return res.status(500).json({'error':'cannot update message'});
            }
        });
    }
}