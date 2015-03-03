'use strict';

exports.status = {
  name: 'addUserToRoom',
  description: 'I will add a user to a room',

  outputExample:{
    'success': true
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
        connection.response.error = err;
        next(connection, true);
      } else if(room === null)
      {
        connection.response.error = 'Error: Room with this id was not found.';
        next(connection, true);
      } else {
        api.models.User.findById(userId, function(err, user){
          if(err)
          {
            connection.response.error = err;
          } else if(user === null)
          {
            connection.response.error = 'Error: User with this id was not found.';
          } else{
            connection.response.success = true;
            room.users.push(user);
            room.save(function(err){
              if(err)
              {
                connection.response.error = err;
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
