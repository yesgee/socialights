'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomUser = require('./fixtures').User;

describe('Model: User', function() {

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

  it('should have initialized the User schema and model', function() {
    should.exist(api.schemas.User);
    should.exist(api.models.User);
  });

  it('should validate a random user', function(done) {
    var user = new api.models.User(randomUser());
    user.validate(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should not be valid without a name', function(done) {
    var user = new api.models.User();
    user.validate(function(err) {
      should.exist(err);
      err.should.have.property('errors');
      err.errors.should.have.property('name');
      done();
    });
  });

  describe('#joinGame', function() {
    var game;
    var user;

    beforeEach(function(done) {
      user = new api.models.User(randomUser());
      game = new api.models.Game(require('./fixtures').Game());

      user.save(function(err) {
        should.not.exist(err);
        game.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should set the game in the user\'s game attribute', function(done) {
      user.joinGame(game, function(err, result) {
        should.not.exist(err);
        user.game.should.equal(game._id);
        done();
      });
    });

    it('should add the user to the game\'s users attribute', function(done) {
      user.joinGame(game, function(err, result) {
        should.not.exist(err);
        game.populate('users', function() {
          game.users.should.not.be.empty;
          game.users[0].id.should.equal(user.id);
          done();
        });
      });
    });

  });

  describe('Team methods', function() {
    var game;
    var user;

    beforeEach(function(done) {
      user = new api.models.User(randomUser());
      game = new api.models.Game(require('./fixtures').Game());

      game.teams = [
        { name: 'Red Team', color: '#ff0000', users: [], score: 0 },
        { name: 'Blue Team', color: '#0000ff', users: [], score: 0 }
      ];

      user.save(function(err) {
        should.not.exist(err);
        game.save(function(err) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('#joinTeam should require the user to be in the game before joining a team', function(done) {
      user.joinTeam(0, function(err, result) {
        should.exist(err);
        err.should.equal('Error: User is not in a game.');
        done();
      });
    });

    it('#leaveTeam should require the user to be in the game before leaving a team', function(done) {
      user.leaveTeam(function(err, result) {
        should.exist(err);
        err.should.equal('Error: User is not in a game.');
        done();
      });
    });

    it('#switchTeam should require the user to be in the game before switching a team', function(done) {
      user.switchTeam(function(err, result) {
        should.exist(err);
        err.should.equal('Error: User is not in a game.');
        done();
      });
    });

  });

  describe('#leaveGame', function() {
    var game;
    var user;

    beforeEach(function(done) {
      user = new api.models.User(randomUser());
      game = new api.models.Game(require('./fixtures').Game());

      user.game = game;

      game.users = [user];

      user.save(function(err, res) {
        should.not.exist(err);
        game.save(function(err, res) {
          should.not.exist(err);
          done();
        });
      });
    });

    it('should set the user\'s game attribute to null', function(done) {
      user.leaveGame(function(err, result) {
        should.not.exist(err);
        expect(user.game).to.be.null;
        done();
      });
    });

    it('should remove the user from the game\'s users attribute', function(done) {
      user.leaveGame(function(err, result) {
        api.models.Game.findOne(game._id).exec(function(err, result) {
          result.users.should.be.empty;
          done();
        });
      });
    });

  });

});
