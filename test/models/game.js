'use strict';

/* jshint expr:true */

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

  describe('previousQuestions', function() {

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

  describe('#initializeTeams', function() {

    it('should initialize two teams', function(done) {
      var room = new api.models.Room(randomRoom());
      var game = new api.models.Game(randomGame());
      game.room = room;

      game.teams.should.be.empty;

      game.initializeTeams(function(err, result) {
        should.not.exist(err);
        game.teams.length.should.equal(2);
        done();
      });
    });

    it('should not initialize when already initialized', function(done) {
      var room = new api.models.Room(randomRoom());
      var game = new api.models.Game(randomGame());
      game.room = room;

      game.teams.push({ name: 'Green Team', color: '#00ff00', users: [], score: 0 });

      game.initializeTeams(function(err, result) {
        should.exist(err);
        game.teams.length.should.equal(1);
        done();
      });
    });

  });

  describe('#userTeam', function() {

    var game;
    var user;

    beforeEach(function(done) {
      var room = new api.models.Room(randomRoom());
      game = new api.models.Game(randomGame());
      game.room = room;

      user = new api.models.User(require('./fixtures').User());

      game.initializeTeams(function(err, result) {
        done();
      });
    });

    it('should return -1 for a non-playing user', function() {
      game.userTeam(user).should.equal(-1);
    });

    it('should return 0 when the user is in team 0', function() {
      game.teams[0].users.push(user._id);
      game.userTeam(user).should.equal(0);
    });

    it('should return 0 when the user is in team 1', function() {
      game.teams[1].users.push(user._id);
      game.userTeam(user).should.equal(1);
    });

  });

  describe('#addUserToTeam', function() {

    var game;
    var user;

    beforeEach(function(done) {
      var room = new api.models.Room(randomRoom());
      game = new api.models.Game(randomGame());
      game.room = room;

      user = new api.models.User(require('./fixtures').User());

      game.initializeTeams(function(err, result) {
        done();
      });
    });

    it('should assign the user to a given team if the team index is given.', function(done) {
      game.addUserToTeam(user, 0, function(err, result) {
        should.not.exist(err);
        game.teams[0].users.should.include(user._id);
        done();
      });
    });

    it('should add the user to the game if it is not already', function(done) {
      game.addUserToTeam(user, 0, function(err, result) {
        should.not.exist(err);
        game.users.should.include(user._id);
        done();
      });
    });

    it('should assign the user to the smallest team if no team index is given.', function(done) {
      var user1 = new api.models.User(require('./fixtures').User());
      var user2 = new api.models.User(require('./fixtures').User());
      var user3 = new api.models.User(require('./fixtures').User());

      game.teams[0].users.addToSet(user1._id);
      game.teams[0].users.addToSet(user2._id);
      game.teams[1].users.addToSet(user3._id);

      game.save(function(err, result) {
        game.addUserToTeam(user, function(err, result) {
          should.not.exist(err);
          game.teams[1].users.should.include(user._id);
          done();
        });
      });
    });

  });

  describe('#removeUserFromTeam', function() {

    var game;
    var user;

    beforeEach(function(done) {
      var room = new api.models.Room(randomRoom());
      game = new api.models.Game(randomGame());
      game.room = room;

      user = new api.models.User(require('./fixtures').User());

      game.initializeTeams(function(err, result) {
        done();
      });
    });

    it('should throw an error when the user is not in a team', function(done) {
      game.removeUserFromTeam(user, function(err, res) {
        should.exist(err);
        err.should.equal('Error: This user is not in a team.');
        done();
      });
    });

    it('should remove the user from his team', function(done) {
      game.addUserToTeam(user, function(err, result) {
        game.removeUserFromTeam(user, function(err, res) {
          should.not.exist(err);
          game.userTeam(user).should.equal(-1);
          done();
        });
      });
    });

  });

  describe('#switchTeam', function() {

    var game;
    var user;

    beforeEach(function(done) {
      var room = new api.models.Room(randomRoom());
      game = new api.models.Game(randomGame());
      game.room = room;

      user = new api.models.User(require('./fixtures').User());

      game.initializeTeams(function(err, result) {
        done();
      });
    });

    it('should throw an error when the user is not in a team', function(done) {
      game.switchTeam(user, function(err, result) {
        should.exist(err);
        err.should.equal('Error: This user is not in a team.');
        done();
      });
    });

    it('should put the user in the second team when it was in the first', function(done) {
      game.addUserToTeam(user, 0, function(err, result) {
        game.switchTeam(user, function(err, result) {
          should.not.exist(err);
          game.teams[1].users.should.include(user._id);
          done();
        });
      });
    });

    it('should put the user in the first team when it was in the second', function(done) {
      game.addUserToTeam(user, 1, function(err, result) {
        game.switchTeam(user, function(err, result) {
          should.not.exist(err);
          game.teams[0].users.should.include(user._id);
          done();
        });
      });
    });

  });

  describe('#askNextQuestion', function() {

    var game;
    var user;
    var question;

    beforeEach(function(done) {
      var room = new api.models.Room(randomRoom());
      game = new api.models.Game(randomGame());
      game.room = room;

      user = new api.models.User(require('./fixtures').User());

      game.initializeTeams(function(err, result) {
        question = api.models.Question(require('./fixtures').Question());
        question.save(function(err, result) {
          done();
        });
      });

    });

    it('should throw an error when the previous question is not answered', function(done) {
      var previous = require('./fixtures').AskedQuestion();
      var now = previous.askedAt = new Date();
      previous.deadlineAt = new Date(now.getTime() + 10 * 1000);
      game.previousQuestions.push(previous);

      game.askNextQuestion(function(err, result) {
        should.exist(err);
        err.should.equal('Error: The last question should be answered first.');
        done();
      });
    });

    it('should throw an error when there are no questions left', function(done) {
      game.previousQuestions.push(require('./fixtures').AskedQuestion());
      game.askNextQuestion(function(err, result) {
        should.exist(err);
        err.should.equal('Error: There is no next question.');
        done();
      });
    });

    it('should not throw an error after the previous question\'s deadline', function(done) {
      var previousQuestion = require('./fixtures').AskedQuestion();
      previousQuestion.question = api.models.Question(require('./fixtures').Question());
      game.previousQuestions.push();

      game.nextQuestions.push(api.models.Question(require('./fixtures').Question()));

      game.askNextQuestion(function(err, result) {
        should.not.exist(err);
        done();
      });
    });

    it('should get the next question and set the question, askedAt, deadlineAt and team attributes', function(done) {
      var previousQuestion = require('./fixtures').AskedQuestion();
      previousQuestion.question = api.models.Question(require('./fixtures').Question());
      game.previousQuestions.push();

      game.nextQuestions.push(question);

      game.askNextQuestion(function(err, result) {
        game.question(function(err, res) {
          should.not.exist(err);
          res.question.should.equal(question._id);
          should.exist(res.askedAt);
          should.exist(res.deadlineAt);
          res.deadlineAt.getTime().should.be.above(res.askedAt.getTime());
          should.exist(res.team);
          res.team.should.be.below(game.teams.length);
        });
        done();
      });
    });

    it('should assign the next team to the current question', function(done) {
      var previousQuestion = require('./fixtures').AskedQuestion();
      previousQuestion.question = api.models.Question(require('./fixtures').Question());
      previousQuestion.team = 0;
      game.previousQuestions.push(previousQuestion);

      game.nextQuestions.push(question);

      game.askNextQuestion(function(err, result) {
        game.question(function(err, res) {
          res.team.should.equal(1);
        });
        done();
      });
    });

  });

  describe('#answerQuestion', function() {

    it('should not allow an answer from the other team');

    it('should set the answeredAt, answeredBy and answer attributes of the current question.');

    it('should validate the question answer');

    it('should give points for a correct answer');

    it('should not give points for a late answer');

    it('should not give points for an incorrect answer');

  });

});
