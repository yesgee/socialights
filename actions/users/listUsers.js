'use strict';

exports.listUsers = {
  name: 'listUsers',
  description: 'I will return a list of all users',

  outputExample:{
    'users':[{
        '_id':'1',
        'name':'Bob',
        'game':
        {
          '_id':'1',
          'type':'quiz'
        }
    }, {
        '_id':'2',
        'name':'Alice',
        'room':
        {
          '_id':'1',
          'name': 'EIT Amazingly Awesomely Common Room',
          'currentGame':{
            '_id':'1',
            'type':'quiz'
          }
        },
        'game':
        {
          '_id':'1',
          'type':'quiz'
        }
    }]
  },

  run: function(api, connection, next) {
    api.models.User.find(function(err, results) {
      if (err) {
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.users = results;
      }
      next(connection, true);
    });
  }
};
