'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var find = require('mout/array/find');

var randomGame = require('../../models/fixtures').Game;
var randomUser = require('../../models/fixtures').User;
var randomQuestion = require('../../models/fixtures').Question;
var randomAskedQuestion = require('../../models/fixtures').AskedQuestion;

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
  var correctId;
  var incorrectId;

  beforeEach(function(done) {
    user = api.models.User(randomUser());
    user.save(function(err, result) {
      game = api.models.Game(randomGame());
      game.initializeTeams(function(err, result) {
        user.joinGame(game, function(err, result) {
          user.joinTeam(0, function(err, result) {
            question = api.models.Question(randomQuestion());
            question.save(function(err, result) {
              correctId = find(question.answers, { correct: true }).id;
              incorrectId = find(question.answers, { correct: false }).id;
              game.previousQuestions.push(randomAskedQuestion({ question: question, team: 0 }));
              game.save(function(err, result) {
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
      game: new api.mongo.ObjectID().toString(),
      answer: '54fdc92b7361040a3e340c7f'
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
      game: game.id,
      answer: '54fdc92b7361040a3e340c7f'
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: User with this id was not found.');
      done();
    });
  });

  it('should return positive for the right answer', function(done) {
    api.specHelper.runAction('answerQuestion', {
      user: user.id,
      game: game.id,
      answer: correctId
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.game.question.answeredCorrectly);
      response.game.question.answeredCorrectly.should.equal(true);
      done();
    });
  });

  it('should return negative for the wrong answer', function(done) {
    api.specHelper.runAction('answerQuestion', {
      user: user.id,
      game: game.id,
      answer: incorrectId
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.game.question.answeredCorrectly);
      response.game.question.answeredCorrectly.should.equal(false);
      done();
    });
  });

});
