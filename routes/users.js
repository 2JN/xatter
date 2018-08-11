var express = require('express');
var router = express.Router();
var passport = require('passport');

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('message') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/profile',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('message') });
})

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/profile',
  failureRedirect: '/login',
  failureFlash: true
}))

module.exports = router;
