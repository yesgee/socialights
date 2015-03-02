'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var forEach = require('mout/array/forEach');
var randomQuestion = require('./fixtures').Question;

describe('Model: Question', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        done();
      });
    });
  });

  after(function(done) {
    actionhero.stop(function(err) {
      done();
    });
  });

  it('should have initialized the Question schema and model', function() {
    should.exist(api.schemas.Question);
    should.exist(api.models.Question);
  });

  it('should validate a random question', function(done) {
    var question = new api.models.Question(randomQuestion());
    question.validate(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should not be valid without a question or answers', function(done) {
    var question = new api.models.Question();
    question.validate(function(err) {
      should.exist(err);
      err.should.have.property('errors');
      err.errors.should.have.property('question');
      err.errors.should.have.property('answers');
      done();
    });
  });

  it('should not be valid when there is no correct answer', function(done) {
    var question = new api.models.Question(randomQuestion());
    forEach(question.answers, function(val) { val.correct = false; });
    question.validate(function(err) {
      should.exist(err);
      err.should.have.property('errors');
      err.errors.should.not.have.property('question');
      err.errors.should.have.property('answers');
      done();
    });
  });

  it('should not be valid when there is more than one correct answer', function(done) {
    var question = new api.models.Question(randomQuestion());
    question.answers[0].correct = true;
    question.answers[1].correct = true;
    question.validate(function(err) {
      should.exist(err);
      err.should.have.property('errors');
      err.errors.should.not.have.property('question');
      err.errors.should.have.property('answers');
      done();
    });
  });

  describe('#checkAnswer', function() {
    var question;

    before(function() {
      question = new api.models.Question(randomQuestion());
      forEach(question.answers, function(val) { val.correct = false; });
      question.answers[3].correct = true;
    });

    it('should throw an error for an index < 0', function(done) {
      question.checkAnswer(-1, function(err, result) {
        should.exist(err);
        done();
      });
    });

    it('should throw an error for an index > answer length', function(done) {
      question.checkAnswer(4, function(err, result) {
        should.exist(err);
        done();
      });
    });

    it('should return true for the correct answer', function(done) {
      question.checkAnswer(3, function(err, result) {
        should.not.exist(err);
        result.should.be.true;
        done();
      });
    });

    it('should return false for an incorrect answer', function(done) {
      question.checkAnswer(2, function(err, result) {
        should.not.exist(err);
        result.should.be.false;
        done();
      });
    });

  });

});
