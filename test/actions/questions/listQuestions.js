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

describe('Action: listQuestions', function() {

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

  it('should return an empty array when there are no questions', function(done) {
    api.specHelper.runAction('listQuestions', { }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.questions);
      response.questions.should.be.empty;
      done();
    });
  });

  it('should return an array of existing question', function(done) {
    var question = new api.models.Question(randomQuestion());
    question.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('listQuestions', { }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.questions);
        response.questions[0].question.should.equal(question.question);
        done();
      });
    });
  });

});
