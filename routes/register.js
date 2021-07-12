const express = require('express');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  const newUser = new User({
    email: req.body.username,
    password: req.body.password,
  });

  try {
    await newUser.save();
    res.render('secrets');
  } catch (err) {
    res.status(400).send({ message: err.message });
  }
});

module.exports = router;
