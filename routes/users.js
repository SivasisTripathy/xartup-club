const express = require('express');
const router = express.Router();
const { isLoggedIn } = require('../middleware/isLoggedIn');

// @route     GET api/users/:id
// @desc      Show a user
// @access    Public

router.get('/:id', isLoggedIn, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ msg: 'User not found' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
});