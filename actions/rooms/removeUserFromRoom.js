'use strict';


exports.status = {
  name: 'removeUserFromRoom',
  description: 'I will remove a user from a room',

  outputExample:{
    'status':'OK'
  },
  inputs: {
    user: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    room: {
      required: true,
      formatter: function(s){ return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.response.status = 'OK';
    next(connection, true);
  }
};
