'use strict';

exports.addUserToTeam = {
  name: 'addUserToTeam',
  description: 'I will add a user to a team',

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
    team: {
      required: true,
      formatter: function(n) { return parseInt(n); }
    },
  },

  run: function(api, connection, next) {
    var teamIdx = connection.params.team;

    connection.models.game.addUserToTeam(connection.models.user, teamIdx, function(err, result) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('game', connection.models.game, connection, next);
    });
  }
};
