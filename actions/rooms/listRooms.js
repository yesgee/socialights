'use strict';

exports.status = {
  name: 'listRooms',
  description: 'I will return a list of all rooms',

  outputExample:{
    'rooms': [
      {
        'id': '1',
        'name': 'EIT Amazingly Awesomely Common Room',
        'location': 'Open Innovation House',
        'gameTypes': ['quiz'],
        'users': [
          {
            'id':'1',
            'name':'Bob',
          },{
            'id':'2',
            'name':'Alice',
          }
        ],
        'currentGame': {
          'id':'1',
          'type':'quiz'
        }
      },
      {
        'id': '2',
        'name': 'Broom Cupbord Under the Stairs',
        'location': '4 Privet Drive',
        'gameTypes': ['quiz'],
        'users': [
          {
            'id':'1',
            'name':'Bob',
          },{
            'id':'3',
            'name':'HP',
          }
        ],
        'currentGame': {
          'id':'2',
          'type':'quiz'
        }
      }
    ]
  },
  run: function(api, connection, next) {
    api.models.Room.find(function(err, results) {
      if(err) {
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.rooms = results;
      }
      next(connection, true);
    });
  }
};
