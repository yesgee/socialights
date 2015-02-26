'use strict';


exports.status = {
  name: 'removeUserFromTeam',
  description: 'I will remove a user from a team',

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
    team: {
      required: true,
      formatter: function(n){ return parseInt(n); }
    },
  },

  run: function(api, connection, next) {
    connection.response.status = 'OK';
    next(connection, true);
  }
};
