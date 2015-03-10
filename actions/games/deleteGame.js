'use strict';

exports.deleteGame = {
  name: 'deleteGame',
  description: 'I will delete a game',

  outputExample:{
    succes: true
  },

  inputs: {
    id: {
      required: true,
      model: 'Game',
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    connection.models.game.remove(function(err, game) {
      if (err) { return connection.handleModelError(err, next); }
      connection.response.success = true;
      next(connection, true);
    });
  }
};
