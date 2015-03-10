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

describe('Action: showGame', function() {

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

  var game;
  beforeEach(function(done) {
    game = new api.models.Game(randomGame());
    game.save(function(err) {
      done();
    });
  });

  it('should require a game ID', function(done) {
    api.specHelper.runAction('showGame', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: id is a required parameter for this action');
      done();
    });
  });

  it('should return an error for a non-existing game', function(done) {
    api.specHelper.runAction('showGame', { id: new api.mongo.ObjectID().toString() }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Game with this id was not found.');
      done();
    });
  });

  it('should return an existing game', function(done) {
    api.specHelper.runAction('showGame', { id: game.id }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.game);
      response.game.id.should.equal(game.id);
      done();
    });
  });

});
