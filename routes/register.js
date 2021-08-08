const express = require('express');
const passport = require('passport');
const User = require('../models/user');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('register');
});

router.post('/', async (req, res) => {
  await User.register(
    { username: req.body.username },
    req.body.password,
    function (err, user) {
      if (err) {
        console.error(err);
        return res.redirect('/register');
      }
      passport.authenticate('local'), (req, res) => res.redirect('/secrets');
    }
  );
});

module.exports = router;
