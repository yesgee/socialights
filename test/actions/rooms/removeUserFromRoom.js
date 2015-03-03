'use strict';

/* jshint expr:true */

process.env.NODE_ENV = 'test';

var chai = require('chai');
var expect = chai.expect;
var should = chai.should();

var actionheroPrototype = require('actionhero').actionheroPrototype;
var actionhero = new actionheroPrototype();
var api;

var randomUser = require('../../models/fixtures').User;
var randomRoom = require('../../models/fixtures').Room;


describe('Action: removeUserFromRoom', function() {

  before(function(done) {
    actionhero.start(function(err, a) {
      api = a;
      api.mongo.connect(function(err, db) {
        // Remove all existing users
        api.mongo.db.collection('users').remove(function() {
          // Remove all existing rooms
          api.mongo.db.collection('rooms').remove(function() {
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

  it('should remove a user from a room', function(done){
    var user = api.models.User(randomUser());
    var room = api.models.Room(randomRoom());
    user.save(function(err) {
      should.not.exist(err);
      room.save(function(err) {
        should.not.exist(err);
        api.specHelper.runAction('removeUserFromRoom', {user: user.id, room: room.id}, function(response) {
          should.not.exist(response.error);
          should.exist(response.success);
          done();
        });
      });
    });
  });

  it('should return an error for a non-existing room', function(done) {
    var user = api.models.User(randomUser());
    user.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('removeUserFromRoom', { user: user.id
        .toString(), room: new api.mongo.ObjectID().toString() }, function(response) {
        should.exist(response.error);
        should.not.exist(response.success);
        response.error.should.equal('Error: Room with this id was not found.');
        done();
      });
    });
  });

  it('should return an error for a non-existing room', function(done) {
    var room = api.models.Room(randomRoom());
    room.save(function(err) {
      should.not.exist(err);
      api.specHelper.runAction('removeUserFromRoom', { user: new api.mongo.ObjectID()
        .toString(), room: room.id }, function(response) {
        should.exist(response.error);
        should.not.exist(response.success);
        response.error.should.equal('Error: User with this id was not found.');
        done();
      });
    });
  });

});
