'use strict';


exports.status = {
  name: 'showRoom',
  description: 'I will return all information about a single room',

  outputExample:{
    'room': {
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
    }
  },
  inputs: {
    id: {
      required: true,
      formatter: function(s){ return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.response.room = {};
    next(connection, true);
  }
};
