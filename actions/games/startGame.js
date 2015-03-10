'use strict';

exports.startGame = {
  name: 'startGame',
  description: 'I will start a game',

  outputExample:{
    'success': true,
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
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    var gameId = new api.mongo.ObjectID(connection.params.id);

    api.models.Game.findById(gameId, function(err, game) {
      if (err) {
        connection.response.error = err;
      } else if (game === null) {
        connection.response.error = 'Error: Game with this id was not found.';
      } else {
        connection.response.success = true;
        game.start(function(err) {
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
      next(connection, true);
    });
  }
};
