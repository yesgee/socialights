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

describe('Action: showQuestion', function() {

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

  it('should require a question ID', function(done) {
    api.specHelper.runAction('showQuestion', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: id is a required parameter for this action');
      done();
    });
  });

  it('should return an error for a non-existing question', function(done) {
    api.specHelper.runAction('showQuestion', { id: new api.mongo.ObjectID().toString() }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Question with this id was not found.');
      done();
    });
  });

  it('should return an existing question', function(done) {
    var question = new api.models.Question(randomQuestion());
    question.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('showQuestion', { id: question.id }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.question);
        response.question.question.should.equal(question.question);
        done();
      });
    });
  });

});
