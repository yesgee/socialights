'use strict';

var map = require('mout/array/map');
// var pick = require('mout/object/pick');

exports.createGame = {
  name: 'createGame',
  description: 'I will create a game',

  outputExample: require('./sample_output.json'),

  inputs: {
    user: {
      required: false,
      model: 'User',
      formatter: function(s) { return String(s); }
    },
    nrOfQuestions: {
      required:false,
      formatter: function(n) { return parseInt(n); },
      default:10
    }
  },

  run: function(api, connection, next) {
    var game = api.models.Game();
    var nrOfQuestions = connection.params.nrOfQuestions;

    //insert random questions
    api.models.Question.findRandom({}, {}, {limit:nrOfQuestions}, function(err, result) {
      if (err) {
        connection.response.success = false;
        connection.response.error = err;
        next(connection, true);
      }
      // console.log(result);
      game.nextQuestions = map(result, function(question) {
        return question.id;
      });
      game.initializeTeams(function(err, result) {
        if (err) {
          connection.response.success = false;
          connection.response.error = err;
          next(connection, true);
        }
        game.save(function(err, game) {
          if (err) { return connection.handleModelError(err, next); }

          if (connection.models.user) {
            connection.models.user.joinGame(game, function(err, result) {
              if (err) { return connection.handleModelError(err, next); }

              connection.renderModel('game', game, connection, next);
            });
          } else {
            connection.renderModel('game', game, connection, next);
          }
        });
      });
    });
  }
};
