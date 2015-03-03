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

describe('Action: createRoom', function() {

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

  // it('should require a name parameter', function(done){
  //   var room = randomRoom();
  //   api.specHelper.runAction('createRoom', {location: room.location}, function(response) {
  //     should.exist(response.error);
  //     should.not.exist(response.success);
  //     response.error.should.equal('Error: name is a required parameter for this action');
  //     done();
  //   });
  // });
  //
  // it('should require a location parameter', function(done){
  //   var room = randomRoom();
  //   api.specHelper.runAction('createRoom', {name: room.name}, function(response) {
  //     should.exist(response.error);
  //     should.not.exist(response.success);
  //     response.error.should.equal('Error: location is a required parameter for this action');
  //     done();
  //   });
  // });

  it('should create a room and save it to the database', function(done) {
    var room = randomRoom();
    api.specHelper.runAction('createRoom', room, function(response) {
      should.not.exist(response.error);
      should.exist(response.success);
      should.exist(response.room);
      response.room.name.should.equal(room.name);
      response.room.location.should.equal(room.location);

      api.models.Room.findOne(response.room._id).exec(function(err, response) {
        should.not.exist(err);
        should.exist(response);
        response.name.should.equal(room.name);
        response.location.should.equal(room.location);
        done();
      });
    });
  });
});
