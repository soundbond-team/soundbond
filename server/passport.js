
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const GithubStrategy = require('passport-github2').Strategy;

const passport = require("passport");

const GOOGLE_CLIENT_ID = "604710966029-fj29hvte1cihfsou28flhfb5a1h3tqt5.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET ="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";

passport.use(
    new GoogleStrategy(
        {
    clientID: GOOGLE_CLIENT_ID,
    clientSecret: GOOGLE_CLIENT_SECRET,
    callbackURL: "/auth/google/callback"
    },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile);
  }
));


const GITHUB_CLIENT_ID = "355fcc1e2b7005178add";
const GITHUB_CLIENT_SECRET = "006b0aa1731e08fdba759764f56137b7b1b05356";

passport.use(
    new GithubStrategy(
        {
    clientID: GITHUB_CLIENT_ID,
    clientSecret: GITHUB_CLIENT_SECRET,
    callbackURL: "/auth/github/callback"
    },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile);
  }
));

const FACEBOOK_APP_ID = "1240443076441693";
const FACEBOOK_APP_SECRET = "54a46e9b53561e4b8e610cd1847844b1";


passport.use(new FacebookStrategy({
    clientID: FACEBOOK_APP_ID,
    clientSecret: FACEBOOK_APP_SECRET,
    callbackURL: "/auth/facebook/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    done(null,profile);
  }
));

passport.serializeUser((user,done)=>{
    done(null,user);
});

passport.deserializeUser((user,done)=>{
    done(null,user);
});