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

describe('Action: searchUsers', function() {

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

  it('should require a query parameter', function(done) {
    api.specHelper.runAction('searchUsers', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: query is a required parameter for this action');
      done();
    });
  });

  it('should successfully query an existing user', function(done){
    var user = new api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('searchUsers', {query: user.name}, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.users);
        response.users.should.not.be.empty;
        response.users[0].name.should.equal(user.name);
      });
    });
  });

  it('should unsuccessfully query a non-existing user', function(done){
    var user = new api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('searchUsers', {query: user.name + 'x'}, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.users);
        response.users.should.be.empty;
      });
    });
  });
});
