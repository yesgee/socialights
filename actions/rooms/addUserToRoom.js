'use strict';

exports.status = {
  name: 'addUserToRoom',
  description: 'I will add a user to a room',

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
    var roomId = connection.params.room;
    var userId = connection.params.user;
    api.models.Room.findById(roomId, function(err, room){
      if(err)
      {
        connection.response.success = false;
        connection.response.error = err;
        next(connection, true);
      } else {
        api.models.User.findById(userId, function(err2, user){
          if(err2)
          {
            connection.response.error = err2;
            connection.response.success = false;
          } else{
            connection.response.success = true;
            room.users.push(user);
            room.save(function(err3){
              if(err3)
              {
                connection.response.error = err3;
                connection.response.success = false;
              }
              else
              {
                connection.response.success = true;
              }
            });
          }
          next(connection, true);
        });
      }

    });
  }
};
