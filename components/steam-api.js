var http = require('http');

var SteamApi = function(apiKey, userId) {
  this.apiKey = apiKey;
  this.userId = userId;
  this.host   = 'http://api.steampowered.com';
  this.path   = {
    games:  '/IPlayerService/GetOwnedGames/v0001/?key=',
    global: '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?key=',
    player: '/ISteamUserStats/GetPlayerAchievements/v0001/?key='
  };
};

SteamApi.prototype.sendRequest = function(type, data, success, fail) {
  var path = this.path[type] + this.apiKey;
  for (var i in data) {
    path += '&'+ i +'='+ data[i];
  }

  http
    .get(this.host + path, function(res) {
      var data = '';

      res
        .on('data', function(chunk) {
          data += chunk;
        })
        .on('end', function() {
          success(JSON.parse(data));
        })
      ;
    })
    .on('error', fail)
  ;
};

SteamApi.prototype.getGames = function(success, fail) {
  this.sendRequest('games', { steamid: this.userId }, success, fail);
};

SteamApi.prototype.getGlobalAchievements = function(id, success, fail) {
  this.sendRequest('global', { gameid: id }, success, fail);
};

SteamApi.prototype.getPlayerAchievements = function(id, success, fail) {
  this.sendRequest('games', {
    appid:   id,
    steamid: this.userId
  }, success, fail);
};

module.exports = SteamApi;
