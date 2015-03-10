'use strict';

exports.removeUserFromTeam = {
  name: 'removeUserFromTeam',
  description: 'I will remove a user from a team',

  outputExample: require('./sample_output.json'),

  inputs: {
    user: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    game: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var gameId = connection.params.game;
    var userId = connection.params.user;
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
            user.leaveTeam(function(err) {
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
