module.exports = (app) => {
    const router = require("express").Router();
    const passport = require("passport");
    const CLIENT_URL = "http://localhost:3000/";


    router.get("/login/success",(req,res)=>{
        if(req.user){
            res.status(200).json({
                success : true ,
                message : "successfull",
                user : req.user,
            });
        }

    });

    router.get("/login/failed",(_req,res)=>{
        res.status(401).json({
            success : false ,
            message : "failure",
        });
    });


    router.get("/logout",(req,res)=>{
        req.logout();
        res.redirect(CLIENT_URL);

    });

    app.get('/auth/google',
        passport.authenticate('google', { scope: ['profile'] }));

    app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        let prevSession = req.session;
        req.session.regenerate((_err) => {  // Compliant
        Object.assign(req.session, prevSession);
        res.redirect(CLIENT_URL);
        });
    });

    app.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    function(_req, res) {
        // Successful authentication, redirect home.
        res.redirect(CLIENT_URL);
    });



    app.get('/auth/github',
        passport.authenticate('github'));

    app.post('/login',
    passport.authenticate('local', { failureRedirect: '/login' }),
    function(req, res) {
        let prevSession = req.session;
        req.session.regenerate((err) => {  // Compliant
        Object.assign(req.session, prevSession);
        res.redirect(CLIENT_URL);
        });
    });
    app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(_req, res) {
        // Successful authentication, redirect home.
        res.redirect(CLIENT_URL);
    });



    app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["profile"] }));
    
    app.get('/auth/facebook/callback', 
    passport.authenticate('facebook', { failureRedirect: '/login' }),
    function(_req, res){
        res.redirect(CLIENT_URL);
    });

    app.use("/api/v1/auth", router);

};