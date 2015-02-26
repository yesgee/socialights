'use strict';


exports.status = {
  name: 'startGame',
  description: 'I will start a game',

  outputExample:{
    'status':'OK'
  },
  inputs: {
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
