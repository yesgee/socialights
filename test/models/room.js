'use strict';

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomRoom = require('./fixtures').Room;

describe('Model: Room', function() {

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

  it('should have initialized the Room schema and model', function() {
    should.exist(api.schemas.Room);
    should.exist(api.models.Room);
  });

  it('should validate a random room', function(done) {
    var room = new api.models.Room(randomRoom());
    room.validate(function(err) {
      should.not.exist(err);
      done();
    });
  });

  it('should not be valid without a name or location', function(done) {
    var room = new api.models.Room();
    room.validate(function(err) {
      err.should.have.property('errors');
      err.errors.should.have.property('name');
      err.errors.should.have.property('location');
      done();
    });
  });

});
