'use strict';

exports.removeUserFromGame = {
  name: 'removeUserFromGame',
  description: 'I will remove a user from a game',

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
    connection.models.user.leaveGame(function(err) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('game', connection.models.game, connection, next);
    });
  }
};
