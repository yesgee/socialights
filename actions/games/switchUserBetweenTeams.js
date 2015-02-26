'use strict';

exports.switchUserBetweenTeams = {
  name: 'switchUserBetweenTeams',
  description: 'I will switch a user between two teams',

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
    teamFrom: {
      required: true,
      formatter: function(n){ return parseInt(n); }
    },
    teamTo: {
      required: true,
      formatter: function(n){ return parseInt(n); }
    }
  },

  run: function(api, connection, next) {
    var gameId = connection.params.game;
    var userId = connection.params.user;
    var teamFrom = connection.params.teamFrom;
    var teamTo = connection.params.teamTo;
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
            connection.response.success = true;
            game.teams[teamFrom].users.remove(user);
            game.teams[teamTo].users.push(user);
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
