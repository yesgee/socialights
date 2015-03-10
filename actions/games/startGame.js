'use strict';

exports.startGame = {
  name: 'startGame',
  description: 'I will start a game',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    var gameId = new api.mongo.ObjectID(connection.params.id);

    api.models.Game.findById(gameId, function(err, game) {
      if (err) {
        connection.response.error = err;
      } else if (game === null) {
        connection.response.error = 'Error: Game with this id was not found.';
      } else {
        connection.response.success = true;
        game.start(function(err) {
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
      next(connection, true);
    });
  }
};
