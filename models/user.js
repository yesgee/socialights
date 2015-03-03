'use strict';

var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');

// User Schema
var userSchema = new Schema({
  name: { type: String, required: true },
  room: { type: Schema.Types.ObjectId, ref: 'Room' },
  game: { type: Schema.Types.ObjectId, ref: 'Game' }
});
userSchema.plugin(timestamps);

// Instance Methods

userSchema.methods.joinRoom = function(room, callback) {
  var _this = this;

  // Update the room in the user object and save
  this.room = room;
  this.save(function(err, result) {
    if (err) {
      callback(err);
    } else {
      // Update the user array in the room object and save
      room.users.addToSet(_this._id);
      room.save(function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, _this);
        }
      });
    }
  });
};

userSchema.methods.joinGame = function(game, callback) {
  var _this = this;

  if (!this.room) {
    callback('Error: User is not in a room.');
  } else {
    // Update the game in the user object and save
    this.game = game;
    this.save(function(err, result) {
      if (err) {
        callback(err);
      } else {
        // Update the user array in the game object and save
        game.users.addToSet(_this._id);
        game.save(function(err, result) {
          if (err) {
            callback(err);
          } else {
            callback(null, _this);
          }
        });
      }
    });
  }
};

userSchema.methods.getGame = function(callback) {
  if (!this.game) {
    callback('Error: User is not in a game.');
  } else {
    this.populate({ path: 'game', model: 'Game' }, function(err, result) {
      if (err) {
        callback(err);
      } else {
        callback(null, result.game);
      }
    });
  }
};

userSchema.methods.joinTeam = function(teamIdx, callback) {
  var _this = this;

  this.getGame(function(err, game) {
    if (err) {
      callback(err);
    } else {
      game.addUserToTeam(_this, teamIdx, function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, _this);
        }
      });
    }
  });
};

userSchema.methods.leaveTeam = function(callback) {
  var _this = this;

  this.getGame(function(err, game) {
    if (err) {
      callback(err);
    } else {
      game.removeUserFromTeam(_this, function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, _this);
        }
      });
    }
  });
};

userSchema.methods.switchTeam = function(callback) {
  var _this = this;

  this.getGame(function(err, game) {
    if (err) {
      callback(err);
    } else {
      game.switchTeam(_this, function(err, result) {
        if (err) {
          callback(err);
        } else {
          callback(null, _this);
        }
      });
    }
  });
};

userSchema.methods.leaveGame = function(callback) {
  var _this = this;

  this.getGame(function(err, game) {
    if (err) {
      callback(err);
    } else {
      // Remove the user from his team
      var teamIdx = game.userTeam(_this);
      if (teamIdx >= 0) {
        game.teams[teamIdx].users.pull(_this._id);
      }
      // Remove the user from the game
      game.users.pull(_this._id);
      game.save(function(err, result) {
        if (err) {
          callback(err);
        } else {
          _this.game = null;
          _this.save(callback);
        }
      });
    }
  });
};

userSchema.methods.leaveRoom = function(callback) {
  var _this = this;

  var leave = function() {
    _this.populate('room', function(err, result) {
      var room = _this.room;

      // Update the room in the user object and save
      _this.room = null;
      _this.save(function(err, result) {
        if (err) {
          callback(err);
        } else {
          // Update the user array in the room object and save
          room.users.pull(_this._id);
          room.save(function(err, result) {
            if (err) {
              callback(err);
            } else {
              callback(null, _this);
            }
          });
        }
      });
    });
  };

  // Leave the game first, if present
  if (this.game) {
    this.leaveGame(leave);
  } else {
    leave();
  }

};

// Initialize the Model for global MongoDB
var initialize = function(api) {
  return api.mongo.connection.model('User', userSchema);
};

module.exports = {
  name: 'User',
  userSchema: userSchema,
  schema: userSchema,
  initialize: initialize
};
