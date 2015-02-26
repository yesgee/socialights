'use strict';


exports.status = {
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
    connection.response.status = 'OK';
    next(connection, true);
  }
};
