'use strict';

exports.addUserToGame = {
  name: 'addUserToGame',
  description: 'I will add a user to a game',

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
    var userId = connection.params.user;
    var gameId = connection.params.game;
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
            connection.response.error = err2;
            connection.response.success = false;
            next(connection, true);
          } else{
            game.users.push(user);
            game.save(function(err3){
              if(err3)
              {
                connection.response.success = false;
                connection.response.error = err3;
              }
              else
              {
                connection.response.success = true;
              }
              next(connection, true);
            });
          }
        });
      }
    });
  }
};
