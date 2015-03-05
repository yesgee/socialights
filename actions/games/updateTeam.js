'use strict';

exports.updateTeam = {
  name: 'updateTeam',
  description: 'I will update a team',

  outputExample:{
    'succes':true
  },
  inputs: {
    game: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    team: {
      required: true,
      formatter: function(n) { return parseInt(n); }
    },
    color: {
      required: false,
      formatter: function(s) { return String(s); }
    },
    name: {
      required: false,
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    var gameId = new api.mongo.ObjectID(connection.params.game);
    var name = connection.params.name;
    var color = connection.params.color;
    var teamIdx = connection.params.team;
    api.models.Game.findById(gameId, function(err, game) {
      if (err) {
        connection.response.error = err;
        next(connection, true);
      } else if (game === null) {
        connection.response.error = 'Error: Game with this id was not found.';
        next(connection, true);
      } else {
        if (teamIdx >= game.teams.length) {
          connection.response.error = 'Error: Team index out of range.';
          next(connection, true);
        }
        if (name) {
          game.teams[teamIdx].name = name;
        }
        if (color) {
          game.teams[teamIdx].color = color;
        }
        game.save(function(err, result) {
          if (err) {
            connection.response.success = false;
            connection.response.error = err;
          } else {
            connection.response.success = true;
            connection.response.teams = result.teams;
          }
          next(connection, true);
        });
      }
    });
  }
};
