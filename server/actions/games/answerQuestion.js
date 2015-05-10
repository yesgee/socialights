'use strict';

var map = require('mout/array/map');

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

        var teams = map(connection.models.game.teams, function(team) {
          return {
            score: team.score,
            color: [
              parseInt(team.color.substring(1, 3), 16),
              parseInt(team.color.substring(3, 5), 16),
              parseInt(team.color.substring(5, 7), 16),
            ]};
        });
        api.chatRoom.broadcast({}, 'room:demo', {
          cmdType: 'ANSWER',
          correct: result.answeredCorrectly,
          teams: teams });

        connection.renderModel('game', connection.models.game, connection, next);
      });
    } catch (e) {
      connection.response.error = 'Error: Invalid Answer ID.';
      next(connection, true);
    }
  }
};
