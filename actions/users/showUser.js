'use strict';


exports.status = {
  name: 'showUser',
  description: 'I will return all information about a single User',

  outputExample:{
    'user':{
        'id':'1',
        'name':'Bob',
        'room':
        {
          'id':'2',
          'name': 'EIT Amazingly Awesomely Common Room',
          'currentGame':{
            'id':'1',
            'type':'quiz'
          }
        },
        'game':
        {
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
    connection.response.user = {};
    next(connection, true);
  }
};
