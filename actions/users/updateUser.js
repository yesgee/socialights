'use strict';

exports.updateUser = {
  name: 'updateUser',
  description: 'I will update a User',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      model: 'User',
      formatter: function(s) { return String(s); }
    },
    name: {
      required: false,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    if (connection.params.name) {
      connection.models.user.set('name', connection.params.name);
    }

    connection.models.user.save(function(err, user) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('user', user, connection, next);
    });
  }
};
