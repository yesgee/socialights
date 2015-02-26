'use strict';

exports.createTeam = {
  name: 'createTeam',
  description: 'I will create a team in a certain game',

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
    teamName: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    teamColor: {
      required: true,
      formatter: function(s){ return String(s); }
    }
  },
  run: function(api, connection, next) {
    var userId = connection.params.user;
    var gameId = connection.params.game;
    var teamName = connection.params.teamName;
    var teamColor = connection.params.teamColor;
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
            game.teams.push({
              name: teamName,
              color: teamColor,
              users: [user]
            });
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
