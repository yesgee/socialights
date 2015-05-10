'use strict';

exports.deleteUser = {
  name: 'deleteUser',
  description: 'I will delete a User',

  outputExample: {
    succes: true
  },

  inputs: {
    id: {
      required: true,
      model: 'User',
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    connection.models.user.remove(function(err, user) {
      if (err) { return connection.handleModelError(err, next); }
      connection.response.success = true;
      next(connection, true);
    });
  }
};
