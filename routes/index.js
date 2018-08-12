var express = require('express');
var router = express.Router();
var passport = require('passport');

var { isLoggedIn } = require('../middleware/index')

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/signup', function(req, res) {
  res.render('signup.ejs', { message: req.flash('message') });
});

router.post('/signup', passport.authenticate('local-signup', {
  successRedirect : '/chat',
  failureRedirect : '/signup',
  failureFlash : true
}));

router.get('/login', function(req, res) {
  res.render('login.ejs', { message: req.flash('message') });
});

router.post('/login', passport.authenticate('local-login', {
  successRedirect: '/chat',
  failureRedirect: '/login',
  failureFlash: true
}));

router.get('/chat', isLoggedIn, function(req, res) {
  res.render('chat.ejs', { user: req.user });
});

module.exports = router;
