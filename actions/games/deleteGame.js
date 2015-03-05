'use strict';

exports.deleteGame = {
  name: 'deleteGame',
  description: 'I will delete a game',

  outputExample:{
    'succes':true
  },
  inputs: {
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var gameId = new api.mongo.ObjectID(connection.params.id);

    api.models.Game.findByIdAndRemove(gameId, function(err, result) {
      if (err) {
        connection.response.error = err;
      } else if (result === null) {
        connection.response.error = 'Error: Game with this id was not found.';
      } else {
        connection.response.success = true;
      }
      next(connection, true);
    });
  }
};
