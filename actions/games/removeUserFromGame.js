'use strict';


exports.status = {
  name: 'removeUserFromGame',
  description: 'I will remove a user from a game',

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
  },

  run: function(api, connection, next) {
    connection.response.status = 'OK';
    next(connection, true);
  }
};
