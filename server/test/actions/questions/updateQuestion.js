'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomQuestion = require('../../models/fixtures').Question;

describe('Action: updateQuestion', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing questions
        api.mongo.db.collection('questions').remove(function() {
          done();
        });
      });
    });
  });

  after(function(done) {
    actionhero.stop(function(err) {
      done();
    });
  });

  var question;
  var newQuestion;
  var newAnswers;
  beforeEach(function(done) {
    question = new api.models.Question(randomQuestion());
    newQuestion = new api.models.Question(randomQuestion()).question;
    newAnswers = new api.models.Question(randomQuestion()).answers;
    question.save(function(err) {
      done();
    });
  });

  it('should require a question ID', function(done) {
    api.specHelper.runAction('updateQuestion', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: id is a required parameter for this action');
      done();
    });
  });

  it('should return an error for a non-existing question', function(done) {
    api.specHelper.runAction('updateQuestion', { id: new api.mongo.ObjectID().toString() }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Question with this id was not found.');
      done();
    });
  });

  it('should update the question of an existing question', function(done) {
    api.specHelper.runAction('updateQuestion', { id: question.id, question: newQuestion }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.question);
      response.question.question.should.equal(newQuestion);
      done();
    });
  });

  it('should update the answers of an existing question (JSON)', function(done) {
    api.specHelper.runAction('updateQuestion', {
      id: question.id,
      answers: newAnswers
      }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.question);
      response.question.answers[0].answer.should.equal(newAnswers[0].answer);
      done();
    });
  });

  it('should update the answers of an existing question (String)', function(done) {
    api.specHelper.runAction('updateQuestion', {
      id: question.id,
      answers: JSON.stringify(newAnswers)
      }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.question);
      response.question.answers[0].answer.should.equal(newAnswers[0].answer);
      done();
    });
  });

});
