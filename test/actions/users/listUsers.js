'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomUser = require('../../models/fixtures').User;

describe('Action: listUsers', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing users
        api.mongo.db.collection('users').remove(function() {
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

  it('should return an empty array when there are no users', function(done) {
    api.specHelper.runAction('listUsers', { }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.users);
      response.users.should.be.empty;
      done();
    });
  });

  it('should return an array of existing users', function(done) {
    var user = new api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('listUsers', { }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.users);
        response.users[0].name.should.equal(user.name);
        done();
      });
    });
  });

});
