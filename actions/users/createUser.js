'use strict';

exports.createUser = {
  name: 'createUser',
  description: 'I will create a User',

  outputExample:{
    'succes':true
  },
  inputs: {
    name: {
      required: true,
      formatter: function(s){ return String(s); }
    }
  },
  run: function(api, connection, next) {
    var name = connection.params.name;
    var user = api.models.User({
      name: name
    });
    user.save(function(err){
      if(err){
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
      }
      next(connection, true);
    });
  }
};
