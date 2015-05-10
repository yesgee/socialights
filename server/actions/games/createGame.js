'use strict';

var map = require('mout/array/map');

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
      if (err) { return connection.handleModelError(err, next); }

      game.nextQuestions = map(result, function(question) {
        return question.id;
      });
      game.initializeTeams(function(err, result) {
        if (err) { return connection.handleModelError(err, next); }

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
          var teams = map(game.teams, function(team) {
            return {
              score: team.score,
              color: [
                parseInt(team.color.substring(1, 3), 16),
                parseInt(team.color.substring(3, 5), 16),
                parseInt(team.color.substring(5, 7), 16),
              ]};
          });
          api.chatRoom.broadcast({},
            'room:demo',
            {cmdType: 'NEWGAME'});
          api.chatRoom.broadcast({},
            'room:demo',
            {cmdType: 'SETSCORES',  teams: teams});

        });
      });
    });
  }
};
