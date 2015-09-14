var express = require('express');
var router = express.Router();

/* GET home page */
router.get('/', function(req, res, next) {
  if (req.user) {
    next();
  } else {
    res.render('home');
  }
}, function(req, res) {
  res.render('user', {
    user: req.user._json
  });
});

module.exports = router;
