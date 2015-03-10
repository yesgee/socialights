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

describe('Action: updateTeam', function() {

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

  var game;
  var teamIdx = 0;
  var newTeamName = 'Team awesomely';
  var newTeamColor = '#ffffff';
  beforeEach(function(done) {
    game = api.models.Game(randomGame());
    game.save(function(err, result) {
      game.initializeTeams(function(err, result) {
        done();
      });
    });
  });

  it('should return an error for a non-existing game', function(done) {
    api.specHelper.runAction('updateTeam', {
      game: new api.mongo.ObjectID().toString(),
      team: 0
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Game with this id was not found.');
      done();
    });
  });

  it('should return an error for a non-existing team', function(done) {
    api.specHelper.runAction('updateTeam', {
      game: game.id,
      team: 2
    }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Team index out of range.');
      done();
    });
  });

  it('should update the name of an existing team', function(done) {
    api.specHelper.runAction('updateTeam', {
      game: game.id,
      team: teamIdx,
      name: newTeamName
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game.teams);
      response.game.teams[teamIdx].name.should.equal(newTeamName);
      done();
    });
  });

  it('should update the color of an existing team', function(done) {
    api.specHelper.runAction('updateTeam', {
      game: game.id,
      team: teamIdx,
      color: newTeamColor
    }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game.teams);
      response.game.teams[teamIdx].color.should.equal(newTeamColor);
      done();
    });
  });
});
