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

describe('Action: createTeam', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing users
        api.mongo.db.collection('users').remove(function() {
          // Remove all existing games
          api.mongo.db.collection('games').remove(function() {
            done();
          });
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
  var game;

  beforeEach(function(done) {
    user = api.models.User(randomUser());
    user.save(function(err, result) {
      game = api.models.Game(randomGame());
      game.save(function(err, result) {
        done();
      });
    });
  });

  it('should return an error for a non-existing game', function(done) {
    api.specHelper.runAction('createTeam', {
      game: new api.mongo.ObjectID().toString(),
      teamName: 'Team 404',
      teamColor: '#ff0000'
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Game with this id was not found.');
      done();
    });
  });

  it('should return an error for a non-existing user', function(done) {
    api.specHelper.runAction('createTeam', {
      user: new api.mongo.ObjectID().toString(),
      game: game.id,
      teamName: 'Blue Team',
      teamColor: '#0000ff'
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: User with this id was not found.');
      done();
    });
  });

  it('should create a team without a user and save it to the database', function(done) {
    api.specHelper.runAction('createTeam', {
      game: game.id,
      teamName: 'Blue Team',
      teamColor: '#0000ff'
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);

      api.models.Game.findById(game._id, function(err, result) {
        should.not.exist(err);

        result.teams.should.not.be.empty;

        result.teams[0].name.should.equal('Blue Team');
        result.teams[0].color.should.equal('#0000ff');
        result.teams[0].users.should.be.empty;

        done();
      });
    });
  });

  it('should create a team with a user and save it to the database', function(done) {
    api.specHelper.runAction('createTeam', {
      game: game.id,
      user: user.id,
      teamName: 'Blue Team',
      teamColor: '#0000ff'
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);

      api.models.Game.findById(game._id, function(err, result) {
        should.not.exist(err);

        result.teams.should.not.be.empty;

        result.teams[0].name.should.equal('Blue Team');
        result.teams[0].color.should.equal('#0000ff');
        result.teams[0].users.should.not.be.empty;
        result.teams[0].users.should.include(user._id);

        done();
      });
    });
  });

});
