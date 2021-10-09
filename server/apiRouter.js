var express = require('express');
var usersController = require('./routes/usersController');
var router = express.Router();

//Router
exports.route =(function(){
    var apiRouter = express.Router();

    // users route
    apiRouter.route('/users/register/').post(usersController.register);
    apiRouter.route('/users/login').post(usersController.login)

    return apiRouter;
})();
module.exports = router;
