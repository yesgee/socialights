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
var randomRoom = require('../../models/fixtures').Room;
var randomUser = require('../../models/fixtures').User;
var gameType = randomGame().gameType;

describe('Action: addUserToGame', function() {

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

  it('should add a user to a game', function(done){

    var user = api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      var room = api.models.Room(randomRoom());
      room.save(function(err) {
        should.not.exist(err);
        var game = api.models.Game({
          room: room.id,
          user: user.id,
          gameType: gameType
        });
        game.save(function(err){
          should.not.exist(err);
        });
      });
    });



  });

  it('should return an error for a non-existing game', function(done) {
    var user = api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('addUserToGame', { user: user.id
        .toString(), game: new api.mongo.ObjectID().toString() }, function(response) {
        should.exist(response.error);
        should.not.exist(response.success);
        response.error.should.equal('Error: Game with this id was not found.');
        done();
      });
    });
  });

  it('should return an error for a non-existing user', function(done) {
    var game = api.models.Game(randomGame());
    game.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('addUserToGame', { user: new api.mongo.ObjectID()
        .toString(), game: game.id }, function(response) {
        should.exist(response.error);
        should.not.exist(response.success);
        response.error.should.equal('Error: User with this id was not found.');
        done();
      });
    });
  });
});
