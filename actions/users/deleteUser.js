'use strict';

exports.deleteUser = {
  name: 'deleteUser',
  description: 'I will delete a User',

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
    api.models.User.findOneAndRemove(connection.params.id).exec(function(err, result) {
      if (err) {
        connection.response.error = err;
      } else if (result === null) {
        connection.response.error = 'Error: User with this id was not found.';
      } else {
        connection.response.success = true;
        connection.response.user = result;
      }
      next(connection, true);
    });
  }
};
