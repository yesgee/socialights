'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomGame = require('../../models/fixtures').Game;
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

  var game;
  var nextQuestion;

  beforeEach(function(done) {
    game = api.models.Game(randomGame());
    nextQuestion = api.models.Question(randomQuestion());
    nextQuestion.save(function(err, result) {
      game.nextQuestions.push(nextQuestion);
      game.save(function(err, result) {
        done();
      });
    });
  });

  it('should return an error for a non-existing game', function(done) {
    api.specHelper.runAction('askNextQuestion', {
      game: new api.mongo.ObjectID().toString(),
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Game with this id was not found.');
      done();
    });
  });

  it('should ask the next question and not finish the game', function(done) {
    api.specHelper.runAction('askNextQuestion', {
      game: game.id,
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game.previousQuestions);
      response.game.finished.should.equal(false);
      response.game.previousQuestions[0].question.id.should.equal(nextQuestion.id);
      done();
    });
  });

});
