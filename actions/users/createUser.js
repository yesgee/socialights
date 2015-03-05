'use strict';

var pick = require('mout/object/pick');

exports.createUser = {
  name: 'createUser',
  description: 'I will create a User',

  outputExample:{
    'succes': true,
    'user': {
      '_id': '54ef42e82c8ede007cebed2c',
      'name': 'Bob'
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
    user.save(function(err, result) {
      if (err) {
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.user = result;
      }
      next(connection, true);
    });
  }
};
