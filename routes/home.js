var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  if (req.user) {
    return next();
  }

  res.render('home');
}, function(req, res) {
  res.render('user', {
    user: req.user._json
  });
});

module.exports = router;
