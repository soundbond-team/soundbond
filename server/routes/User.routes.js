


module.exports = (app) => {
    const userCtrl = require('../controllers/user.controller');
    const db = require("../models");
    const router = require('express').Router();


    router.post('/register', userCtrl.signup);
    router.post('/login', userCtrl.login);  


    
};







 