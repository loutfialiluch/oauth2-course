// config file
const { google } = require("../config/config");
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

// User model
const User = require("../models/User");

// Called after the call back function
passport.serializeUser((user, done) => {
  console.log(user);
  done(null, user.id);
});

// Extracting the user from session
passport.deserializeUser((id, done) => {
    User.findById(id)
    .then(user => {
        done(null,user);
    })
    .catch(err => {
        done(err, false);
    })
});

passport.use(
  new GoogleStrategy(
    {
      // options for the strategy
      callbackURL: "/auth/google/redirect",
      clientID: google.clientId,
      clientSecret: google.clientSecret,
    },
    (accessToken, refreshToken, profile, done) => {
      //  passport callback function
      User.findOne({ googleId: profile.id })
        .then((currentUser) => {
          if (currentUser) {
            //User is existing in DB => existing user
            done(null, currentUser);
          } else {
            // User doesn't exist in DB => new user
            new User({
              username: profile.displayName,
              googleId: profile.id,
            })
              .save()
              .then((user) => {
                done(null, user);
              })
              .catch((err) => {
                done(err, false);
              });
          }
        })
        .catch((err) => {
          done(err, false);
        });
    }
  )
);
