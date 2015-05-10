'use strict';

exports.switchUserBetweenTeams = {
  name: 'switchUserBetweenTeams',
  description: 'I will switch a user between two teams',

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
    }
  },

  run: function(api, connection, next) {
    connection.models.user.switchTeam(function(err, game) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('game', game, connection, next);
    });
  }
};
