'use strict';

exports.deleteRoom = {
  name: 'deleteRoom',
  description: 'I will delete a room',

  outputExample:{
    succes: true
  },
  inputs: {
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    api.models.Room.findOneAndRemove(connection.params.id).exec(function(err, result) {
      if (err) {
        connection.response.error = err;
      } else if (result === null) {
        connection.response.error = 'Error: Room with this id was not found.';
      } else {
        connection.response.success = true;
        connection.response.room = result;
      }
      next(connection, true);
    });
  }
};
