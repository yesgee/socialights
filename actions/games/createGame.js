'use strict';

exports.createGame = {
  name: 'createGame',
  description: 'I will create a game',

  outputExample: require('./sample_output.json'),

  inputs: {
    user: {
      required: false,
      model: 'User',
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var game = api.models.Game();

    game.save(function(err, game) {
      if (err) { return connection.handleModelError(err, next); }

      if (connection.models.user) {
        connection.models.user.joinGame(game, function(err, result) {
          if (err) { return connection.handleModelError(err, next); }

          connection.renderModel('game', game, connection, next);
        });
      } else {
        connection.renderModel('game', game, connection, next);
      }
    });
  }
};
