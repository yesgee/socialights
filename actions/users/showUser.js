'use strict';

exports.status = {
  name: 'showUser',
  description: 'I will return all information about a single User',

  outputExample:{
    'user':{
        '_id':'1',
        'name':'Bob',
        'game':
        {
          '_id':'1',
          'type':'quiz'
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
    var userId = new api.mongo.ObjectID(connection.params.id);

    api.models.User.findById(userId, function(err, result) {
      if (err) {
        connection.response.error = err;
      } else if (result === null) {
        connection.response.error = 'Error: User with this id was not found.';
      } else {
        connection.response.success = true;
        connection.response.user = result;
      }
      next(connection, true);
    });
  }
};
