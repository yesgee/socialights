'use strict';

exports.listUsers = {
  name: 'listUsers',
  description: 'I will return a list of all users',

  outputExample:{
    'users':[{
        'id':'1',
        'name':'Bob',
        'room':
        {
          'id':'1',
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
    },{
        'id':'2',
        'name':'Alice',
        'room':
        {
          'id':'1',
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
    }]
  },

  run: function(api, connection, next) {
    api.models.User.find(function(err, results) {
      if(err) {
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.users = results;
      }
      next(connection, true);
    });
  }
};
