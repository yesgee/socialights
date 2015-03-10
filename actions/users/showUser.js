'use strict';

exports.showUser = {
  name: 'showUser',
  description: 'I will return all information about a single User',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    var userId = new api.mongo.ObjectID(connection.params.id);

    api.models.User.findById(userId, function(err, user) {
      if (err) {
        connection.response.error = err;
        next(connection, true);
      } else if (user === null) {
        connection.response.error = 'Error: User with this id was not found.';
        next(connection, true);
      } else {
        user.getFullJSON(function(err, result) {
          if (err) {
            connection.response.error = err;
          } else {
            connection.response.success = true;
            connection.response.user = result;
          }
          next(connection, true);
        });
      }
    });
  }
};
