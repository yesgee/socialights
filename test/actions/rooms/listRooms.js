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

describe('Action: listRooms', function() {

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

  it('should return an empty array when there are no rooms', function(done) {
    api.specHelper.runAction('listRooms', { }, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.rooms);
      response.rooms.should.be.empty;
      done();
    });
  });

  it('should return an array of existing rooms', function(done) {
    var room = new api.models.Room(randomRoom());
    room.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('listRooms', { }, function(response) {
        should.not.exist(response.error);
        should.exist(response.success);
        should.exist(response.rooms);
        response.rooms[0].name.should.equal(room.name);
        done();
      });
    });
  });

});
