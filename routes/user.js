var express = require('express');
var router = express.Router();

/* GET user info */
router.get('/', function(req, res) {
  res.send(req.user);
});

module.exports = router;
