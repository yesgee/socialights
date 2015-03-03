'use strict';

var saveGame = function(api, connection, next, game){
  api.models.Room.findById(connection.params.room, function(err, room){
    if(err)
    {
      connection.response.error = err;
      next(connection, true);
    } else if(room === null)
    {
      connection.response.error = 'Error: Room with this id was not found.';
      next(connection, true);
    } else {
      game.save(function(err, result){
        if(err){
          connection.response.success = false;
          connection.response.error = err;
        } else {
          connection.response.success = true;
          connection.response.game = result;
        }
        next(connection, true);
      });
    }
  });
};

exports.createGame = {
  name: 'createGame',
  description: 'I will create a game',

  outputExample:{
    game: {
      'id': '1',
      'gameType': 'quiz',
      'started_at': '2015-02-23T13:13:01.479Z',
      'room':
      {
        'id':'1',
        'name': 'EIT Amazingly Awesomely Common Room',
        'currentGame':{
          'id':'1',
          'type':'quiz'
        }
      },
      'users': [
        {
          'id':'1',
          'name':'Bob',
        },{
          'id':'2',
          'name':'Alice',
        }
      ],
      'teams': [
        {
          'name': 'Red Team',
          'color': '#ff0000',
          'users': [
            {
              'id':'1',
              'name':'Bob',
            }
          ],
          'score': 0
        },
        {
          'name': 'Blue Team',
          'color': '#0000ff',
          'users': [
            {
              'id':'2',
              'name':'Alice',
            }
          ],
          'score': 0
        }
      ],
      'currentQuestion': {
        'question': {
          'id': '1',
          'question': 'Is this the question?',
          'answers': [
            'No.',
            'Yes.',
            'Banana.',
            'It depends.'
          ]
        },
        'team': 0,
        'asked_at': '2015-02-23T13:19:27.583Z',
        'deadline': '2015-02-23T13:19:37.583Z'
      }
    }
  },
  inputs: {
    user: {
      required: false,
      formatter: function(s){ return String(s); }
    },
    room: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    gameType: {
      required: true,
      formatter: function(s){ return String(s); }
    }
  },
  run: function(api, connection, next) {
    var game = api.models.Game({
      users: [],
      room: connection.params.room,
      gameType: connection.params.gameType,
    });
    if(connection.params.user !== 'undefined')
    {
      console.log(connection.params.user);
      api.models.User.findById(connection.params.user, function(err, user){
        if(err)
        {
          connection.response.error = err;
          next(connection, true);
        } else if(user === null)
        {
          connection.response.error = 'Error: User with this id was not found.';
          next(connection, true);
        }
        else
        {
          console.log('found user');
          game.users.push(user.id);
          saveGame(api, connection, next, game);
        }
      });
    } else
    {
      saveGame(api, connection, next, game);
    }
  }
};
