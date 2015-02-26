'use strict';

exports.createGame = {
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
    var game = api.models.Game({
      user: connection.params.user,
      room: connection.params.room,
      type: connection.params.type,
    });
    game.save(function(err){
      if(err){
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
      }
      next(connection, true);
    });
  }
};
