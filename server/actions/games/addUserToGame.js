'use strict';

exports.addUserToGame = {
  name: 'addUserToGame',
  description: 'I will add a user to a game',

  outputExample: require('./sample_output.json'),

  inputs: {
    user: {
      required: true,
      model: 'User',
      formatter: function(s) { return String(s); }
    },
    game: {
      required: true,
      model: 'Game',
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.models.user.joinGame(connection.models.game, function(err, result) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('game', connection.models.game, connection, next);
    });
  }
};
