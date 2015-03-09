'use strict';

var map = require('mout/array/map');
var pick = require('mout/object/pick');

exports.listUsers = {
  name: 'listUsers',
  description: 'I will return a list of all users',

  outputExample:{
    'users':[
      { 'id':'54fda3cadb3aba3500b8cde6', '_id':'54fda3cadb3aba3500b8cde6', 'name':'Bob' },
      { 'id':'54fda3cadb3aba3500b8cdeb', '_id':'54fda3cadb3aba3500b8cdeb', 'name':'Alice' }
    ]
  },

  run: function(api, connection, next) {
    api.models.User.find(function(err, users) {
      if (err) {
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.users = map(users, function(user) {
          return pick(user.toJSON(), ['id', '_id', 'name']);
        });
      }
      next(connection, true);
    });
  }
};
