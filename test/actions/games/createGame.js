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

  it('should create a game with a user and save it to the database', function(done){
    var user = api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      var room = api.models.Room(randomRoom());
      room.save(function(err) {
        should.not.exist(err);
        var game = {
          room: room.id,
          user: user.id,
          gameType: gameType
        };
        api.specHelper.runAction('createGame', game, function(response) {
          should.not.exist(response.error);
          should.exist(response.success);
          should.exist(response.game);
          response.game.gameType.should.equal(gameType);
          response.game.room.toString().should.equal(room.id.toString()); //TODO: fix this
          response.game.users[0].toString().should.equal(user.id.toString()); //TODO: fix this
          api.models.Game.findOne(response.game._id).exec(function(err, response) {
            should.not.exist(err);
            should.exist(response);
            response.gameType.should.equal(gameType);
            response.room.toString().should.equal(room.id.toString());
            response.users[0].toString().should.equal(user.id.toString());
            done();
          });
        });
      });
    });
  });

  it('should create a game without a user and save it to the database', function(done){
    var room = api.models.Room(randomRoom());
    room.save(function(err) {
      should.not.exist(err);
      var game = {
        room: room.id,
        gameType: gameType
      };
      api.specHelper.runAction('createGame', game, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.game);
        response.game.gameType.should.equal(gameType);
        response.game.room.toString().should.equal(room.id.toString()); //TODO: fix this
        response.game.users.should.be.empty;
        api.models.Game.findOne(response.game._id).exec(function(err, response) {
          should.not.exist(err);
          should.exist(response);
          response.gameType.should.equal(gameType);
          response.room.toString().should.equal(room.id.toString());
          response.users.should.be.empty;
          done();
        });
      });
    });

  });

});
