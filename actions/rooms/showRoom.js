'use strict';

exports.showRoom = {
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
    api.models.Room.findById(connection.params.id, function(err, result){
      if(err){
        connection.response.error = err;
      } else if (result === null){
        connection.response.error = 'Error: Room with this id was not found.';
      } else {
        connection.response.success = true;
        connection.response.room = result;
      }
      next(connection, true);
    });
  }
};
