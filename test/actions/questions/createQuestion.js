'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

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

  it('should require a .. parameter');

  it('should create a question and save it to the database');

});
