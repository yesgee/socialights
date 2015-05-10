'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

describe('Action: updates', function() {

  var user;
  var startTime;

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing updates
        api.redis.client.del(['updates'], function() {
          startTime = new Date();
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

  it('should require a \'from\' parameter', function(done) {
    api.specHelper.runAction('updates', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: from is a required parameter for this action');
      done();
    });
  });

  it('should return an empty list when there are no updates', function(done) {
    api.specHelper.runAction('updates', { from: startTime.getTime() }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.updates);
      response.updates.should.be.empty;
      done();
    });
  });

  it('should return an array of updates', function(done) {
    var time = new Date();
    user = new api.models.User(require('../models/fixtures').User());
    user.save(function() {
      api.specHelper.runAction('updates', { from: time.getTime() }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.updates);
        response.updates.should.include({
          model: 'user',
          id: user.id,
          type: 'save'
        });
        done();
      });
    });
  });

  it('should not return old updates', function(done) {
    var time;
    user = new api.models.User(require('../models/fixtures').User());
    user.save(function() {
      time = new Date();
      api.specHelper.runAction('updates', { from: time.getTime() + 10 }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.updates);
        response.updates.should.be.empty;
        done();
      });
    });
  });

});
