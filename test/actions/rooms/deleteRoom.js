'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomRoom = require('../../models/fixtures').Room;

describe('Action: deleteRoom', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing rooms
        api.mongo.db.collection('rooms').remove(function() {
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

  it('should require a room ID', function(done) {
    api.specHelper.runAction('deleteRoom', {}, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: id is a required parameter for this action');
      done();
    });
  });

  it('should return an error for a non-existing room', function(done) {
    api.specHelper.runAction('deleteRoom', { id: new api.mongo.ObjectID().toString() }, function(response) {
      should.exist(response.error);
      should.not.exist(response.success);
      response.error.should.equal('Error: Room with this id was not found.');
      done();
    });
  });

  it('should delete an existing room', function(done) {
    var room = new api.models.Room(randomRoom());
    room.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('deleteRoom', { id: room.id }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.room);
        response.room.name.should.equal(room.name);
        response.room.location.should.equal(room.location);
        done();
      });
    });
  });

});
