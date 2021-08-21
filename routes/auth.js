const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/isLoggedIn');
const { check, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');
const User = require('../models/User');
require('dotenv').config();

// @route     GET api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});

// @route     GET api/auth/user
// @desc      Verify a user
// @access    Private

router.get('/user', async (req, res) => {
  try {
    //console.log("Req User:", req);
    //console.log("Reqxx ", req.user);
    res.json(req.user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }

});

// @route     POST api/auth/logres
// @desc      Login/Register a user in the DB
// @access    Private

router.post('/logres',
  async (req, res) => {
    /* const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    } */
    const { googleId } = req.body;
    //console.log("ZZZZ:", req);
    try {
      let user = await User.findOne({ googleId });
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        process.env.JWT_SECRET,
        {
          expiresIn: 360000,
        },
        (err, token) => {
          if (err) throw err;
          res.status(200).json({ token });
        },
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server Error');
    }
  },
);

module.exports = router;