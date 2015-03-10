'use strict';

var map = require('mout/array/map');
var pick = require('mout/object/pick');

exports.listUsers = {
  name: 'listUsers',
  description: 'I will return a list of all users',

  outputExample: {
    'users':[
      require('./sample_output.json').user
    ]
  },

  run: function(api, connection, next) {
    api.models.User.find(function(err, users) {
      if (err) { return connection.handleModelError(err, next); }

      connection.response.success = true;
      connection.response.users = map(users, function(user) {
        return pick(user.toJSON({ virtuals: true }), ['id', 'name']);
      });

      next(connection, true);
    });
  }
};
