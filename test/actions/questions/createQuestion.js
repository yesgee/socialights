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
var forEach = require('mout/array/forEach');

describe('Action: createQuestion', function() {

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

  it('should create a question and save it to the database (JSON)', function(done){
    var question = randomQuestion();
    api.specHelper.runAction('createQuestion', question, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.question);
      response.question.question.should.equal(question.question);
      response.question.answers.length.should.equal(question.answers.length);
      api.models.Question.findOne(response.question._id).exec(function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.question.should.equal(question.question);
        response.answers.length.should.equal(question.answers.length);
        done();
      });
    });
  });

  it('should create a question and save it to the database (String)', function(done){
    var question = randomQuestion();
    question.answers = JSON.stringify(question.answers);
    api.specHelper.runAction('createQuestion', question, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.question);
      response.question.question.should.equal(question.question);
      response.question.answers.length.should.equal(question.answers.length);
      api.models.Question.findOne(response.question._id).exec(function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.question.should.equal(question.question);
        response.answers.length.should.equal(question.answers.length);
        done();
      });
    });
  });

});
