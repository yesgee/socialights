'use strict';

exports.answerQuestion = {
  name: 'answerQuestion',
  description: 'I will answer a question',

  outputExample: require('./sample_output.json'),

  inputs: {
    game: {
      required: true,
      model: 'Game',
      formatter: function(s) { return String(s); }
    },
    user: {
      required: true,
      model: 'User',
      formatter: function(s) { return String(s); }
    },
    answer: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    try {
      var answerId = new api.mongo.ObjectID(connection.params.answer);

      connection.models.game.answerQuestion(connection.models.user, answerId, function(err, result) {
        if (err) { return connection.handleModelError(err, next); }

        connection.renderModel('game', connection.models.game, connection, next);
      });
    } catch (e) {
      connection.response.error = 'Error: Invalid Answer ID.';
      next(connection, true);
    }
  }
};
