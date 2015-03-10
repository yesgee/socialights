'use strict';

var pick = require('mout/object/pick');

exports.createUser = {
  name: 'createUser',
  description: 'I will create a User',

  outputExample: require('./sample_output.json'),

  inputs: {
    name: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var user = api.models.User(pick(connection.params, ['name']));

    user.save(function(err, user) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('user', user, connection, next);
    });
  }
};
