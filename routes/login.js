const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('login');
});

router.post('/', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    await User.findOne({ email: username }, (err, foundUser) => {
      if (foundUser) {
        bcrypt.compare(password, foundUser.password, function (err, result) {
          if (result == true) res.render('secrets');
        });
      }
    });
  } catch (err) {
    res.status(404).send({ message: err.message });
  }
});

module.exports = router;
