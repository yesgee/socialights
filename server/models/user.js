'use strict';

var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');

// User Schema
var userSchema = new Schema({
  name: { type: String, required: true },
  game: { type: Schema.Types.ObjectId, ref: 'Game' }
});
userSchema.plugin(timestamps);

// Instance Methods

userSchema.methods.joinGame = function(game, callback) {
  var _this = this;

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
};

userSchema.methods.getGame = function(callback) {
  if (!this.game) {
    callback('Error: User is not in a game.');
  } else {
    this.model('Game').findOne(this.game, callback);
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
          callback(null, game);
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

userSchema.methods.getFullJSON = function(callback) {
  var _this = this;
  callback(null, _this.toJSON({ virtuals: true }));
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
