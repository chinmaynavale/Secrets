const express = require('express');
const passport = require('passport');
const router = express.Router();

router.get('/', (req, res) => {
  res.render('home');
});

router.get('/secrets', (req, res) => {
  if (req.isAuthenticated()) return res.render('secrets');
  res.redirect('/login');
});

module.exports = router;
