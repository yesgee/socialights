'use strict';

exports.answerQuestion = {
  name: 'answerQuestion',
  description: 'I will answer a question',

  outputExample: require('./sample_output.json'),

  inputs: {
    game: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    user: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    answer: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var userId = new api.mongo.ObjectID(connection.params.user);
    var gameId = new api.mongo.ObjectID(connection.params.game);
    var answerId = new api.mongo.ObjectID(connection.params.answer);

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
            game.answerQuestion(user, answerId, function(err, result) {
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
