'use strict';

exports.showUser = {
  name: 'showUser',
  description: 'I will return all information about a single User',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      model: 'User',
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.renderModel('user', connection.models.user, connection, next);
  }
};
