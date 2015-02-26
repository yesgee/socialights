'use strict';


exports.status = {
  name: 'listGames',
  description: 'I will return a list of all games',

  outputExample:{
    'games': [
      {
        'id': '1',
        'type': 'quiz',
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
    ]
  },
  run: function(api, connection, next) {
    connection.response.games = [];
    next(connection, true);
  }
};
