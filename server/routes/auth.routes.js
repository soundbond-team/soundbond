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

    router.get("/login/failed",(req,res)=>{
        res.status(401).json({
            success : false ,
            message : "failure",
        });
    });


    router.get("/logout",(req,res)=>{
        req.logout();
        res.redirect(CLIENT_URL);

    });

    app.get('/auth/google', function(request, response, next) {
        passport.authenticate('google', {scope: ['profile', 'email']})(request, response, next);
    });

    router.get("/google/callback",function(){
        passport.authenticate("google",{
            successRedirect: CLIENT_URL,
            failureRedirect : "/login/failed",
        });
    });

    app.get('/auth/github',
        passport.authenticate('github'));

    app.get('/auth/github/callback', 
    passport.authenticate('github', { failureRedirect: '/login' }),
    function(req, res) {
        // Successful authentication, redirect home.
        res.redirect('/');
    });



    app.get("/auth/facebook", passport.authenticate("facebook", { scope: ["profile"] }));

    app.get("auth/facebook/callback",
    passport.authenticate("facebook", {
        successRedirect: CLIENT_URL,
        failureRedirect: "/login/failed",
    })
    );

    app.use("/api/v1/auth", router);

};