'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('Action: status', function() {

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

  it('should not crash', function(done) {
    api.specHelper.runAction('status', function(response) {
      should.not.exist(response.error);
      done();
    });
  });

});
