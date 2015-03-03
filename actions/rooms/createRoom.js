'use strict';

exports.createRoom = {
  name: 'createRoom',
  description: 'I will create a Room',

  outputExample:{
    succes: true,
    room: {
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
    name: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    location: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var room = api.models.Room({
      name: connection.params.name,
      location: connection.params.location
    });
    room.save(function(err, result) {
      if (err) {
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.room = result;
      }
      next(connection, true);
    });
  }
};
