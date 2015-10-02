var http = require('http');

var SteamApi = function(apiKey, userId) {
  this.apiKey = apiKey;
  this.userId = userId;
  this.host   = 'api.steampowered.com';
  this.path   = {
    games:  '/IPlayerService/GetOwnedGames/v0001/?key=',
    global: '/ISteamUserStats/GetGlobalAchievementPercentagesForApp/v0002/?key=',
    player: '/ISteamUserStats/GetPlayerAchievements/v0001/?key='
  };
};

SteamApi.prototype.sendRequest = function(type, data, callback) {
  var path = this.path[type] + this.apiKey;
  for (var i in data) {
    path += '&'+ i +'='+ data[i];
  }

  http.request({
    hostname: this.host,
    path:     path
  }, callback).end();
};

SteamApi.prototype.getGames = function(callback) {
  this.sendRequest('games', { steamid: this.userId }, callback);
};

SteamApi.prototype.getGlobalAchievements = function(id, callback) {
  this.sendRequest('global', { gameid: id }, callback);
};

SteamApi.prototype.getPlayerAchievements = function(id, callback) {
  this.sendRequest('games', {
    appid:   id,
    steamid: this.userId
  }, callback);
};

module.exports = SteamApi;
