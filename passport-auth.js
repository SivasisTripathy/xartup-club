const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();
const jwt = require('jsonwebtoken');
const User = require('./models/User');

passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "http://localhost:5000/api/gauth/callback",
},
  async (accessToken, refreshToken, profile, cb) => {
    const newUser = {
      googleId: profile.id,
      fullName: profile.displayName,
      profilePic: profile.photos[0].value,
      email: profile.emails[0].value,
      isEmailVerified: profile.emails[0].verified,
    }
    try {
      let user = await User.findOne({ googleId: profile.id })
      if (!user) {
        user = await User.create(newUser)
      }
      return cb(null, user)
    } catch (err) {
      console.error(err)
    }
    //return cb(null, profile);
  }));
passport.serializeUser(function (user, cb) {
  cb(null, user.id);
});

passport.deserializeUser(function (id, cb) {
  User.findById(id, function (err, user) {
    cb(err, user);
  });
});
