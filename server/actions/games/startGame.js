'use strict';

exports.startGame = {
  name: 'startGame',
  description: 'I will start a game',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      model: 'Game',
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.models.game.start(function(err) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('game', connection.models.game, connection, next);
    });
  }
};
