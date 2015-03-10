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

describe('Action: listGames', function() {

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
  it('should return an empty array when there are no games', function(done) {
    api.specHelper.runAction('listGames', { }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.games);
      response.games.should.be.empty;
      done();
    });
  });

  it('should return an array of existing games', function(done) {
    var game = new api.models.Game(randomGame());
    game.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('listGames', { }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.games);
        response.games[0].id.should.equal(game.id);
        done();
      });
    });
  });

});
