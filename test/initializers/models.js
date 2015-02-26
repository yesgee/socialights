'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('Initializer: Models', function() {

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

  it('should have created the schemas and models objects in the api', function() {
    should.exist(api.schemas);
    should.exist(api.models);
  });

});
