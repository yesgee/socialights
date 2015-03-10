'use strict';

exports.showGame = {
  name: 'showGame',
  description: 'I will return all information about a single game',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    var gameId = new api.mongo.ObjectID(connection.params.id);

    api.models.Game.findById(gameId, function(err, result) {
      if (err) {
        connection.response.error = err;
      } else if (result === null) {
        connection.response.error = 'Error: Game with this id was not found.';
      } else {
        connection.response.success = true;
        connection.response.game = result;
      }
      next(connection, true);
    });
  }
};
