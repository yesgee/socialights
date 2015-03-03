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
        connection.response.error = err;
        next(connection, true);
      } else if(game === null)
      {
        connection.response.error = 'Error: Game with this id was not found.';
      } else {
        api.models.User.findById(userId, function(err, user){
          if(err)
          {
            connection.response.error = err;
            next(connection, true);
          } else if(user === null)
          {
            connection.response.error = 'Error: User with this id was not found.';
          } else {
            game.users.push(user);
            game.save(function(err){
              if(err)
              {
                connection.response.success = false;
                connection.response.error = err;
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
