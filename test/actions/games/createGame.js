'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomGame = require('../../models/fixtures').Game;
var randomUser = require('../../models/fixtures').User;

describe('Action: createGame', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing games
        api.mongo.db.collection('games').remove(function() {
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

  beforeEach(function(done) {
    user = api.models.User(randomUser());
    user.save(function(err, result) {
      done();
    });
  });

  it('should return an error for a non-existing user', function(done) {
    api.specHelper.runAction('createGame', {
      user: new api.mongo.ObjectID().toString()
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: User with this id was not found.');
      done();
    });
  });

  it('should create a game without a user and save it to the database', function(done) {
    api.specHelper.runAction('createGame', {}, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game);

      response.game.users.should.be.empty;

      api.models.Game.findById(response.game._id, function(err, result) {
        should.not.exist(err);
        done();
      });
    });
  });

  it('should create a game with a user and save it to the database', function(done) {
    api.specHelper.runAction('createGame', {
      user: user.id
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game);

      response.game.users.should.not.be.empty;
      response.game.users.should.include(user._id);

      api.models.Game.findOne(response.game._id).exec(function(err, result) {
        should.not.exist(err);
        result.users.should.not.be.empty;
        result.users.should.include(user._id);
        done();
      });
    });
  });

});
