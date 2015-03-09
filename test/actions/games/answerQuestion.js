'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomGame = require('../../models/fixtures').Game;
var randomUser = require('../../models/fixtures').User;
var randomQuestion = require('../../models/fixtures').Question;

describe('Action: answerQuestion', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing users
        api.mongo.db.collection('users').remove(function() {
          // Remove all existing games
          api.mongo.db.collection('games').remove(function() {
            done();
          });
        });
      });
    });
  });

  after(function(done) {
    actionhero.stop(function(err) {
      done();
    });
  });

  var user;
  var game;
  var question;
  var correctIdx;
  var incorrectIdx;

  beforeEach(function(done) {
    user = api.models.User(randomUser());
    user.save(function(err, result) {
      game = api.models.Game(randomGame());
      game.save(function(err, result) {
        game.initializeTeams(function(err, result) {
          user.joinGame(game, function(err, result) {
            user.joinTeam(0, function(err, result) {
              question = api.models.Question(randomQuestion());
              question.save(function(err, result) {
                correctIdx = question.correctAnswer;
                incorrectIdx = correctIdx === 0 ? 1 : 0;
                done();
              });
            });
          });
        });
      });
    });
  });

  it('should return an error for a non-existing game', function(done) {
    api.specHelper.runAction('answerQuestion', {
      user: user.id,
      game: new api.mongo.ObjectID().toString()
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Game with this id was not found.');
      done();
    });
  });

  it('should return an error for a non-existing user', function(done) {
    api.specHelper.runAction('answerQuestion', {
      user: new api.mongo.ObjectID().toString(),
      game: game.id
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: User with this id was not found.');
      done();
    });
  });

  it('should return positive for the right answer', function(done) {
    api.specHelper.runAction('answerQuestion', {
      user: user.id.toString(),
      game: game.id.toString(),
      answer: correctIdx
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.correct);
      response.correct.should.equal(true);
      done();
    });
  });

  it('should return negative for the wrong answer', function(done) {
    api.specHelper.runAction('answerQuestion', {
      user: user.id.toString(),
      game: game.id.toString(),
      answer: incorrectIdx
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.correct);
      response.correct.should.equal(false);
      done();
    });
  });

});
