'use strict';

exports.listGames = {
  name: 'listGames',
  description: 'I will return a list of all games',

  outputExample: {
    games: [
      require('./sample_output.json').game
    ]
  },

  run: function(api, connection, next) {
    api.models.Game.find(function(err, results) {
      if (err) {
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.games = results;
      }
      next(connection, true);
    });
  }
};
