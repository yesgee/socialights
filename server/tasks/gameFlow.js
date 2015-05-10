'use strict';

var forEach = require('mout/array/forEach');

exports.task = {
  name:          'gameFlow',
  description:   'Handle Gameflow',
  frequency:     1000,
  queue:         'default',
  plugins:       [],
  pluginOptions: {},

  run: function(api, params, next) {

    if (api.env == 'test') {
      next();
      return;
    }

    var nextQuestion = function(game) {
      if (game.nextQuestions.length > 0) {
        api.log('Asking next question.');
        game.askNextQuestion(function(e, g) {
          api.chatRoom.broadcast({}, 'room:demo', {
          cmdType: 'STARTCOUNTDOWN',
          seconds:10,
          team: game.question.team}
          );
        });
      } else {
        api.chatRoom.broadcast({}, 'room:demo', {cmdType: 'GAMEOVER'});
        if (!game.finished) {
          api.log('Finishing game.');
          game.finished = true;
          game.save(function() {

          });
        }
      }
    };

    api.models.Game.where({finished: false}).exec(function(e, games) {
      forEach(games, function(game) {
        if (game.startedAt && game.question) {

          // After Deadline
          if (game.question.deadlineAt.getTime() + 3500 < (new Date()).getTime()) {
            nextQuestion(game);
          } else if (game.question.answeredAt) {
            setTimeout(function() { nextQuestion(game); }, 3000);
          }

        }
      });
    });

    next();
  }
};
