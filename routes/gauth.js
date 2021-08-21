const express = require('express');
const router = express.Router();
const passport = require('passport');
const { isLoggedIn } = require('../middleware/isLoggedIn');
require('../passport-auth');

const successLoginUrl = "http://localhost:3000/login/success";
const errorLoginUrl = "http://localhost:3000/login/error";
//const loginPage = "http://localhost:3000/login";

/* In this route you can see that if the user is logged in u can acess his info in: req.user
router.get('/good', isLoggedIn, (req, res) => res.send(`Welcome mr ${req.user.displayName}!`)) */

// Auth Routes
router.get('/', passport.authenticate('google', { scope: ['profile', 'email'] }));

router.get('/callback', passport.authenticate('google', {
  failureMessage: 'Login failed. Please try again.',
  failureRedirect: errorLoginUrl,
  successRedirect: successLoginUrl,
}),
  (req, res) => {
    // Successful authentication, redirect home.
    console.log("Userzzz: ", req.user);
    res.send('<h1>Thank you for signing in!<h1>');
  }
);

router.get('/logout', (req, res) => {
  req.logout();
  //res.redirect(loginPage);
})

module.exports = router;