'use strict';

exports.removeUserFromGame = {
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
    var gameId = connection.params.game;
    var userId = connection.params.user;
    api.models.Game.findById(gameId, function(err, game){
      if(err)
      {
        connection.response.success = false;
        connection.response.error = err;
        next(connection, true);
      } else {
        api.models.User.findById(userId, function(err2, user){
          if(err2)
          {
            connection.response.success = false;
            connection.response.error = err2;
            next(connection, true);
          } else{
            game.users.remove(user);
            game.save(function(err3){
              if(err3)
              {
                connection.response.success = false;
                connection.response.error = err3;
                next(connection, true);
              }
              else
              {
                connection.response.success = true;
              }
              next(connection, true);
            }
            );
          }
        });
      }

    });
  }
};
