'use strict';

var times = require('mout/function/times');
var pluck = require('mout/array/pluck');
var forEach = require('mout/array/forEach');
var fixtures = require('../../test/models/fixtures');
var async = require('async');

module.exports = function(grunt) {

  grunt.registerTask('generateFakeGame', 'Generate a fake game and save it to the database', function() {
    var done = this.async();
    grunt.startActionhero(function(api) {
      api.mongo.connect(function(err, db) {

        grunt.log.writeln('Started ActionHero and connected to MongoDB.');

        var save = function(model, callback) {
          model.save(callback);
        };

        var users = [];
        times(5, function(i) { users.push(new api.models.User(fixtures.User())); });
        var saveUsers = function(cb) { async.each(users, save, cb); };

        var questions = [];
        times(5, function(i) { questions.push(new api.models.Question(fixtures.Question())); });
        var saveQuestions = function(cb) { async.each(questions, save, cb); };

        var game = api.models.Game(fixtures.Game());
        var saveGame = function(cb) { game.save(cb); };

        async.parallel([saveUsers, saveQuestions], function(err, results) {
          grunt.log.writeln('Saved ' + users.length + ' Users and ' + questions.length + ' Questions.');
          game.initializeTeams(function(err) {
            grunt.log.writeln('Initialized Teams.');
            game.nextQuestions = pluck(questions, 'id');
            grunt.log.writeln('Pushed Questions.');
            forEach(users, function(user) { user.game = game.id; });
            game.users = pluck(users, 'id');
            grunt.log.writeln('Pushed Users.');
            game.teams[0].users.addToSet(users[0].id, users[1].id);
            game.teams[1].users.addToSet(users[2].id, users[3].id);
            grunt.log.writeln('Pushed Team members.');
            async.parallel([saveGame, saveUsers], function(err, results) {
              grunt.log.writeln('Game ID: ' + game.id);
              grunt.log.writeln('All done. Have fun!');
              done();
            });
          });
        });

      });

    });
  });

};
