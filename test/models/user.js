'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomUser = require('./fixtures').User;

describe('Model: User', function() {

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

  it('should have initialized the User schema and model', function() {
    should.exist(api.schemas.User);
    should.exist(api.models.User);
  });

  it('should validate a random user', function(done) {
    var user = new api.models.User(randomUser());
    user.validate(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should not be valid without a name', function(done) {
    var user = new api.models.User();
    user.validate(function(err) {
      should.exist(err);
      err.should.have.property('errors');
      err.errors.should.have.property('name');
      done();
    });
  });

});
