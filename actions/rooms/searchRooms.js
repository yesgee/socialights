'use strict';

exports.searchRooms = {
  name: 'searchRooms',
  description: 'I will return a list of all rooms whose name matches the search query',

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
      }
    ]
  },
  inputs: {
    query: {
      required: true,
      formatter: function(s){ return String(s); }
    },
  },
  run: function(api, connection, next) {
    var query = connection.params.query;
    api.models.Room.find({'name': new RegExp(query, 'i')}, function(err, result){
      if(err){
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.rooms = result;
      }
      next(connection, true);
    });
  }
};
