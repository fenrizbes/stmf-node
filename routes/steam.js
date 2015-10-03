var express = require('express');
var config = require('config');
var SteamApi = require('../components/steam-api');
var router = express.Router();

router.get('/*', function(req, res, next) {
  if (req.user) {
    req.steamApi = new SteamApi(config.get('steam.apiKey'), req.user._json.steamid);

    return next();
  }

  return res.redirect('/');
});

router.get('/games', function(req, res, next) {
  req.steamApi.getGames(function(data) {
    res.json(data.response);
  }, function(error) {
    res.json(error);
  });
});

module.exports = router;
