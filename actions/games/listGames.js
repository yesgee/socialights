'use strict';

var map = require('mout/array/map');
var pick = require('mout/object/pick');

exports.listGames = {
  name: 'listGames',
  description: 'I will return a list of all games',

  outputExample: {
    games: [
      require('./sample_output.json').game
    ]
  },

  run: function(api, connection, next) {
    api.models.Game.find(function(err, games) {
      /* istanbul ignore if */
      if (err) { return connection.handleModelError(err, next); }

      connection.response.success = true;
      connection.response.games = map(games, function(game) {
        return pick(game.toJSON({ virtuals: true }), ['id', 'startedAt', 'finished']);
      });

      next(connection, true);
    });
  }
};
