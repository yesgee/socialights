'use strict';


exports.status = {
  name: 'createGame',
  description: 'I will create a game',

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
    type: {
      required: true,
      formatter: function(s){ return String(s); }
    }
  },
  run: function(api, connection, next) {
    connection.response.status = 'OK';
    next(connection, true);
  }
};
