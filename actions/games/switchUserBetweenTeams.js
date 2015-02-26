'use strict';


exports.status = {
  name: 'switchUserBetweenTeams',
  description: 'I will switch a user between two teams',

  outputExample:{
    'status':'OK'
  },
  inputs: {
    user: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    game: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    teamFrom: {
      required: true,
      formatter: function(n){ return parseInt(n); }
    },
    teamTo: {
      required: true,
      formatter: function(n){ return parseInt(n); }
    }
  },

  run: function(api, connection, next) {
    connection.response.status = 'OK';
    next(connection, true);
  }
};
