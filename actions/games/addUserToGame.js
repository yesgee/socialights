'use strict';

exports.addUserToGame = {
  name: 'addUserToGame',
  description: 'I will add a user to a game',

  outputExample:{
    'success': true,
    'game': {
      '_id': '54fda3cadb3aba3500b8cde6',
      'gameType': 'quiz',
      'started_at': '2015-02-23T13:13:01.479Z',
      'users': [
        {
          '_id':'54fda3cadb3aba3500b8cde6',
          'name':'Bob',
        }, {
          '_id':'54fda3cadb3aba3500b8cde6',
          'name':'Alice',
        }
      ],
      'teams': [
        {
          'name': 'Red Team',
          'color': '#ff0000',
          'users': [
            {
              '_id':'54fda3cadb3aba3500b8cde6',
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
              '_id':'54fda3cadb3aba3500b8cde6',
              'name':'Alice',
            }
          ],
          'score': 0
        }
      ],
      'question': {
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
        'deadlineAt': '2015-02-23T13:19:37.583Z',
        'answeredAt': '2015-02-23T13:19:37.583Z',
        'answeredBy': '54fda3cadb3aba3500b8cde6',
        'answer': '54fda3cadb3aba3500b8cde6',
        'answeredCorrectly':'54fda3cadb3aba3500b8cde6'
      }
    }
  },
  inputs: {
    user: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    game: {
      required: true,
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    var userId = new api.mongo.ObjectID(connection.params.user);
    var gameId = new api.mongo.ObjectID(connection.params.game);

    api.models.Game.findById(gameId, function(err, game) {
      if (err) {
        connection.response.error = err;
        next(connection, true);
      } else if (game === null) {
        connection.response.error = 'Error: Game with this id was not found.';
        next(connection, true);
      } else {
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
                connection.response.error = err;
                next(connection, true);
              } else {
                game.getFullJSON(function(err, result) {
                  if (err) {
                    connection.response.error = err;
                  } else {
                    connection.response.success = true;
                    connection.response.game = result;
                  }
                  next(connection, true);
                });
              }
            });
          }
        });
      }
    });
  }
};
