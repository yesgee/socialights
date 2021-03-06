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
  var nrOfQuestions = 5;

  beforeEach(function(done) {
    user = api.models.User(randomUser());
    user.save(function(err, result) {
      done();
    });
  });

  it('should create a game without parameters, initialized' +
   ' teams and questions and save it to the database', function(done) {
    api.specHelper.runAction('createGame', {}, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game);

      response.game.users.should.be.empty;
      response.game.nextQuestions.should.not.be.empty;
      response.game.teams.should.not.be.empty;

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
      response.game.users[0].id.should.equal(user.id);
      response.game.nextQuestions.should.not.be.empty;
      response.game.teams.should.not.be.empty;

      api.models.Game.findById(response.game._id).populate('users').exec(function(err, result) {
        should.not.exist(err);
        result.users.should.not.be.empty;
        result.users[0].id.should.equal(user.id);
        done();
      });
    });
  });

  it('should create a game with a nrOfQuestions and save it to the database', function(done) {
    api.specHelper.runAction('createGame', {nrOfQuestions:nrOfQuestions}, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game);

      response.game.users.should.be.empty;
      response.game.nextQuestions.should.not.be.empty;
      response.game.teams.should.not.be.empty;
      response.game.nextQuestions.length.should.equal(nrOfQuestions);

      api.models.Game.findById(response.game._id, function(err, result) {
        should.not.exist(err);
        done();
      });
    });
  });

});
