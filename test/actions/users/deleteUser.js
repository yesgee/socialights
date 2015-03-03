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

describe('Action: deleteUser', function() {

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

  it('should require a user ID', function(done) {
    api.specHelper.runAction('deleteUser', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: id is a required parameter for this action');
      done();
    });
  });

  it('should return an error for a non-existing user', function(done) {
    api.specHelper.runAction('deleteUser', { id: new api.mongo.ObjectID().toString() }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: User with this id was not found.');
      done();
    });
  });

  it('should delete an existing user', function(done) {
    var user = new api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('deleteUser', { id: user.id }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.user);
        response.user.name.should.equal(user.name);
        done();
      });
    });
  });

});
