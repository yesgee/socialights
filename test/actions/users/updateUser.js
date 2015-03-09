'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomUser = require('../../models/fixtures').User;

describe('Action: updateUser', function() {

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

  var user;
  var newUserName;
  beforeEach(function(done) {
    user = new api.models.User(randomUser());
    newUserName = new api.models.User(randomUser()).name;
    user.save(function(err) {
      done();
    });
  });

  it('should require a user ID', function(done) {
    api.specHelper.runAction('updateUser', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: id is a required parameter for this action');
      done();
    });
  });

  it('should return an error for a non-existing user', function(done) {
    api.specHelper.runAction('updateUser', { id: new api.mongo.ObjectID().toString() }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: User with this id was not found.');
      done();
    });
  });

  it('should update an existing user', function(done) {
    api.specHelper.runAction('updateUser', { id: user.id, name: newUserName}, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.user);
      response.user.name.should.not.equal(user.name);
      response.user.name.should.equal(newUserName);
      done();
    });
  });

});
