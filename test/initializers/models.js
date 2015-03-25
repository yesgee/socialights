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

  describe('change hooks', function() {
    var user;
    var time;

    before(function(done) {
      api.mongo.connect(function(err, db) {
        // Remove all existing updates
        api.redis.client.del(['updates'], function() {
          // Create and save a user
          user = new api.models.User(require('../models/fixtures').User());
          user.save(function() {
            done();
            time = new Date();
          });
        });
      });
    });

    it('should store a \'save\' update after the user is created', function(done) {
      setTimeout(function() {
        api.redis.client.zrangebyscore(['updates', '-inf', '+inf', 'WITHSCORES'], function(err, updates) {
          should.not.exist(err);
          updates.should.include('user:' + user.id + ':save');
          expect(Number(updates[1])).to.be.closeTo(time.getTime(), 10);
          done();
        });
      }, 10);
    });

    it('should store a \'save\' update after the user is updated', function(done) {
      user.name = 'Bob';
      user.save(function() {
        time = new Date();
        setTimeout(function(){
          api.redis.client.zrangebyscore(['updates', '-inf', '+inf', 'WITHSCORES'], function(err, updates) {
            should.not.exist(err);
            updates.should.include('user:' + user.id + ':save');
            expect(Number(updates[1])).to.be.closeTo(time.getTime(), 10);
            done();
          });
        }, 10);
      });
    });

    it('should store a \'remove\' update after the user is updated', function(done) {
      user.remove(function() {
        time = new Date();
        setTimeout(function() {
          api.redis.client.zrangebyscore(['updates', '-inf', '+inf', 'WITHSCORES'], function(err, updates) {
            should.not.exist(err);
            updates.should.include('user:' + user.id + ':remove');
            expect(Number(updates[3])).to.be.closeTo(time.getTime(), 10);
            done();
          });
        }, 10);
      });
    });

  });

});
