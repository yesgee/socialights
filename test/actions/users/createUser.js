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

describe('Action: createUser', function() {

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

  it('should require a name parameter', function(done) {
    api.specHelper.runAction('createUser', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: name is a required parameter for this action');
      done();
    });
  });

  it('should create a user and save it to the database', function(done) {
    var user = randomUser();
    api.specHelper.runAction('createUser', user, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.user);
      response.user.name.should.equal(user.name);

      api.models.User.findOne(response.user._id).exec(function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.name.should.equal(user.name);
        done();
      });
    });
  });

});
