'use strict';

exports.createGame = {
  name: 'createGame',
  description: 'I will create a game',

  outputExample: require('./sample_output.json'),

  inputs: {
    user: {
      required: false,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var game = api.models.Game();
    game.save(function(err, result) {
      if (err) {
        connection.response.success = false;
        connection.response.error = err;
        next(connection, true);
      } else {
        if (connection.params.user) {
          var userId = new api.mongo.ObjectID(connection.params.user);
          api.models.User.findById(userId, function(err, user) {
            if (err) {
              connection.response.error = err;
              next(connection, true);
            } else if (user === null) {
              connection.response.error = 'Error: User with this id was not found.';
              next(connection, true);
            } else {
              user.joinGame(game, function(err, result) {
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
      }
    });
  }
};
