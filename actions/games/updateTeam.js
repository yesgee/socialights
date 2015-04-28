'use strict';

var map = require('mout/array/map');

exports.updateTeam = {
  name: 'updateTeam',
  description: 'I will update a team',

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
    team: {
      required: true,
      formatter: function(n) { return parseInt(n); }
    },
    name: {
      required: false,
      formatter: function(s) { return String(s); }
    },
    color: {
      required: false,
      formatter: function(s) {
        var color = String(s);
        if (color[0] !== '#') {
          color = '#' + color;
        }
        return color;
      }
    }
  },

  run: function(api, connection, next) {
    var teamIdx = connection.params.team;

    if (teamIdx >= connection.models.game.teams.length) {
      connection.response.error = 'Error: Team index out of range.';
      next(connection, true);
      return;
    }

    if (connection.params.name) {
      connection.models.game.teams[teamIdx].set('name', connection.params.name);
    }

    if (connection.params.color) {
      connection.models.game.teams[teamIdx].set('color', connection.params.color);
    }

    connection.models.game.save(function(err, result) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('game', connection.models.game, connection, next);

      var teams = map(connection.models.game.teams, function(team) {
        return {
          score: team.score,
          color: [
            parseInt(team.color.substring(1, 3), 16),
            parseInt(team.color.substring(3, 5), 16),
            parseInt(team.color.substring(5, 7), 16),
          ]};
      });
      api.chatRoom.broadcast({},
        'room:demo',
        {cmdType: 'SETSCORES',  teams: teams});
    });
  }
};
