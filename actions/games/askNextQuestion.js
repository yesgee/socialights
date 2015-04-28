'use strict';

exports.askNextQuestion = {
  name: 'askNextQuestion',
  description: 'I will ask the next question',

  outputExample: require('./sample_output.json'),

  inputs: {
    game: {
      required: true,
      model: 'Game',
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    connection.models.game.askNextQuestion(function(err, result) {
      if (err) { return connection.handleModelError(err, next); }

      api.chatRoom.broadcast({}, 'room:demo', {
      cmdType: 'STARTCOUNTDOWN',
      seconds:10,
      team: connection.models.game.question.team}
      );

      connection.renderModel('game', connection.models.game, connection, next);

    });
  }
};
