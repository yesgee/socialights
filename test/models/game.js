'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomRoom = require('./fixtures').Room;
var randomGame = require('./fixtures').Game;
var randomTeam = require('./fixtures').Team;
var randomQuestion = require('./fixtures').Question;
var randomAskedQuestion = require('./fixtures').AskedQuestion;

describe('Model: Game', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        done();
      });
    });
  });

  after(function(done) {
    actionhero.stop(function(err) {
      done();
    });
  });

  it('should have initialized the Game schema and model', function() {
    should.exist(api.schemas.Game);
    should.exist(api.models.Game);
  });

  it('should validate a random game', function(done) {
    var room = new api.models.Room(randomRoom());
    var game = new api.models.Game(randomGame());
    game.room = room;

    game.validate(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should not be valid without a gameType and room', function(done) {
    var game = new api.models.Game();
    game.validate(function(err) {
      should.exist(err);
      err.should.have.property('errors');
      err.errors.should.have.property('gameType');
      err.errors.should.have.property('room');
      done();
    });
  });

  describe('teams', function() {

    var game;

    beforeEach(function() {
      var room = new api.models.Room(randomRoom());
      game = new api.models.Game(randomGame());
      game.room = room;
    });

    afterEach(function() {
      game = null;
    });

    it('should validate a random team', function(done) {
      game.teams.push(randomTeam());

      game.validate(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should not be valid when a team has no name or color', function(done) {
      game.teams.push({});
      game.validate(function(err) {
        should.exist(err);
        err.errors.should.have.property('teams.0.name');
        err.errors.should.have.property('teams.0.color');
        done();
      });
    });

  });

  describe('askedQuestions', function() {

    var game;
    var question;

    beforeEach(function() {
      var room = new api.models.Room(randomRoom());
      game = new api.models.Game(randomGame());
      game.room = room;

      question = new api.models.Question(randomQuestion());
    });

    afterEach(function() {
      game = null;
    });

    it('should validate a random askedQuestion', function(done) {
      game.previousQuestions.push(randomAskedQuestion({ question: question }));

      game.validate(function(err) {
        should.not.exist(err);
        done();
      });
    });

    it('should not be valid when an askedQuestion has no question, team, askedAt or deadlineAt', function(done) {
      game.previousQuestions.push({});
      game.validate(function(err) {
        should.exist(err);
        err.errors.should.have.property('previousQuestions.0.question');
        err.errors.should.have.property('previousQuestions.0.team');
        err.errors.should.have.property('previousQuestions.0.askedAt');
        err.errors.should.have.property('previousQuestions.0.deadlineAt');
        done();
      });
    });

  });

});
