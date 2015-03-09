'use strict';

var pick = require('mout/object/pick');

exports.createUser = {
  name: 'createUser',
  description: 'I will create a User',

  outputExample:{
    'succes': true,
    'user': {
      name: 'Bob',
      _id: '54fdbfba385c8f942de1b57e',
      id: '54fdbfba385c8f942de1b57e'
    }
  },

  inputs: {
    name: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var user = api.models.User(pick(connection.params, ['name']));
    user.save(function(err, user) {
      if (err) {
        connection.response.error = err;
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
