'use strict';

exports.createGame = {
  name: 'createGame',
  description: 'I will create a game',

  outputExample:{
    'game': {
      '_id': '1',
      'gameType': 'quiz',
      'started_at': '2015-02-23T13:13:01.479Z',
      'users': [
        {
          '_id':'1',
          'name':'Bob',
        }, {
          '_id':'2',
          'name':'Alice',
        }
      ],
      'teams': [
        {
          'name': 'Red Team',
          'color': '#ff0000',
          'users': [
            {
              '_id':'1',
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
              '_id':'2',
              'name':'Alice',
            }
          ],
          'score': 0
        }
      ],
      'currentQuestion': {
        'question': {
          '_id': '1',
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
      formatter: function(s) { return String(s); }
    }
  },
  run: function(api, connection, next) {
    var game = api.models.Game();
    game.save(function(err, result) {
      if (err) {
        connection.response.success = false;
        connection.response.error = err;
        next(connection, true);
      } else {
        if (connection.params.user) {
          var userId = new api.mongo.ObjectID(connection.params.user);
          api.models.User.findById(userId, function(err, user) {
            if (err) {
              connection.response.error = err;
              next(connection, true);
            } else if (user === null) {
              connection.response.error = 'Error: User with this id was not found.';
              next(connection, true);
            } else {
              user.joinGame(game, function(err, result) {
                if (err) {
                  connection.response.success = false;
                  connection.response.error = err;
                } else {
                  connection.response.success = true;
                  connection.response.game = game;
                }
                next(connection, true);
              });
            }
          });
        } else {
          connection.response.success = true;
          connection.response.game = game;
          next(connection, true);
        }
      }
    });
  }
};
