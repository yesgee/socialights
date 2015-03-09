'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomGame = require('../../models/fixtures').Game;
var randomUser = require('../../models/fixtures').User;

describe('Action: switchUserBetweenTeams', function() {

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
  var teamIdx = 0;
  var otherTeamIdx = 1;
  beforeEach(function(done) {
    user = api.models.User(randomUser());
    user.save(function(err, result) {
      game = api.models.Game(randomGame());
      game.save(function(err, result) {
        game.initializeTeams(function(err, result) {
          user.joinGame(game, function(err, result) {
            user.joinTeam(teamIdx, function(err, result) {
              done();
            });
          });
        });
      });
    });
  });

  it('should return an error for a non-existing game', function(done) {
    api.specHelper.runAction('switchUserBetweenTeams', {
      user: user.id,
      game: new api.mongo.ObjectID().toString(),
      team: 0
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Game with this id was not found.');
      done();
    });
  });

  it('should return an error for a non-existing user', function(done) {
    api.specHelper.runAction('switchUserBetweenTeams', {
      user: new api.mongo.ObjectID().toString(),
      game: game.id,
      team: 0
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: User with this id was not found.');
      done();
    });
  });

  it('should switch the user between the teams', function(done) {
    api.specHelper.runAction('switchUserBetweenTeams', {
      user: user.id,
      game: game.id,
      team: teamIdx
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);

      api.models.Game.findById(game._id, function(err, result) {
        should.not.exist(err);
        result.teams[teamIdx].users.should.not.include(user._id);
        result.teams[otherTeamIdx].users.should.include(user._id);
        done();
      });
    });
  });
});
