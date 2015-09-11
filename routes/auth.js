var config   = require('config');
var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var strategy = require('passport-steam').Strategy;

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new strategy({
    returnURL: config.get('realm') +'/auth/return',
    realm:     config.get('realm'),
    apiKey:    config.get('steam.apiKey')
  },
  function (identifier, profile, done) {
    return done(null, profile);
  }
));

router.get('/', passport.authenticate('steam'), function(req, res) {});

router.get('/return', passport.authenticate('steam', {
    failureRedirect: '/error'
  }),
  function (req, res) {
    res.redirect('/user');
  }
);

router.get('/error', function(req, res, next) {
  res.send('Auth error');
});

module.exports = router;
