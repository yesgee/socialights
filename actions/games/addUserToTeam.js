'use strict';

exports.addUserToTeam = {
  name: 'addUserToTeam',
  description: 'I will add a user to a team',

  outputExample: require('./sample_output.json'),

  inputs: {
    user: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    game: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    team: {
      required: true,
      formatter: function(n) { return parseInt(n); }
    },
  },

  run: function(api, connection, next) {
    var userId = new api.mongo.ObjectID(connection.params.user);
    var gameId = new api.mongo.ObjectID(connection.params.game);
    var teamIdx = connection.params.team;

    api.models.Game.findById(gameId, function(err, game) {
      if (err) {
        connection.response.error = err;
        next(connection, true);
      } else if (game === null) {
        connection.response.error = 'Error: Game with this id was not found.';
        next(connection, true);
      } else {
        api.models.User.findById(userId, function(err, user) {
          if (err) {
            connection.response.error = err;
            next(connection, true);
          } else if (user === null) {
            connection.response.error = 'Error: User with this id was not found.';
            next(connection, true);
          } else {
            game.addUserToTeam(user, teamIdx, function(err, response) {
              if (err) {
                connection.response.error = err;
                next(connection, true);
              } else {
                game.getFullJSON(function(err, result) {
                  if (err) {
                    connection.response.error = err;
                  } else {
                    connection.response.success = true;
                    connection.response.game = result;
                  }
                  next(connection, true);
                });
              }
            });
          }
        });
      }
    });
  }
};
