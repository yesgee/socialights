'use strict';

exports.createTeam = {
  name: 'createTeam',
  description: 'I will create a team in a certain game',

  outputExample: require('./sample_output.json'),

  inputs: {
    user: {
      required: false,
      model: 'User',
      formatter: function(s) { return String(s); }
    },
    game: {
      required: true,
      model: 'Game',
      formatter: function(s) { return String(s); }
    },
    name: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    color: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },
  run: function(api, connection, next) {

    var team = {
      name: connection.params.name,
      color: connection.params.color,
      users: []
    };

    if (connection.models.user) {
      team.users.push(connection.models.user._id);
    }

    connection.models.game.teams.push(team);
    connection.models.game.save(function(err, result) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('game', connection.models.game, connection, next);
    });
  }
};
