var LocalStrategy = require('passport-local').Strategy;
var sequelize = require('./database');

var User = require('../models/user')(sequelize)

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id)
      .then(user => {
        done(null, user);
      })
      .catch(err => {
        done(err);
      })
  });

  passport.use('local-signup', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, username, password, done) {
      process.nextTick(function() {
        User.findOrCreate({
          where: { username: username },
          defaults: {
            password: password,
            role: req.body.role
          }
        })
          .spread((user, created) => {
            return created
              ? done(null, user)
              : done(null, false, req.flash('message', 'User already exists'))
          })
          .catch(err => {
            done(err)
          })
      })
    }
  ))

  passport.use('local-login', new LocalStrategy({
      usernameField: 'username',
      passwordField: 'password',
      passReqToCallback: true
    },

    function(req, username, password, done) {
      User.findOne({ where: {username: username} })
        .then(user => {
          if (!user) {
            return done(null, false, req.flash('message', 'No user found.'))
          }

          if (!user.validPassword(password)) {
            return done(null, false, req.flash('message', 'The password is incorrect.'))
          }

          return done(null, user)
        })
        .catch(err => {
          console.log(err)
          done(err)
        })
    }
  ))
}
