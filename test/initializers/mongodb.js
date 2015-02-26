'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('actionhero Tests', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      done();
    });
  });

  after(function(done) {
    actionhero.stop(function(err) {
      done();
    });
  });

  it('should have created the mongo objects in the api', function() {
    should.exist(api.mongo);
    should.exist(api.mongo.connection);
  });

  it('should connect to the local mongoDB installation', function(next) {
    api.mongo.connect(function(err, db) {
      should.not.exist(err);
      should.exist(db);
      should.exist(api.mongo.db);
      next();
    });
  });

});
