const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const router = express.Router();
const saltRounds = 10;

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', (req, res) => {
  bcrypt.hash(req.body.password, saltRounds, async (err, hash) => {
    const newUser = new User({
      email: req.body.username,
      password: hash,
    });

    try {
      await newUser.save();
      res.render('secrets');
    } catch (err) {
      res.status(500).send({ message: err.message });
    }
  });
});

module.exports = router;
