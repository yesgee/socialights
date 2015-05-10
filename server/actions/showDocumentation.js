'use strict';

exports.showDocumentation = {
  name: 'showDocumentation',
  description: 'return API documentation',

  outputExample:{
    'documentation':{
      'showDocumentation':{
        '1':{
          'name':'showDocumentation',
          'version':1,
          'description':'return API documentation',
          'inputs':{}
        }
      },
      'status':{
        '1':{
          'name':'status',
          'version':1,
          'description':'I will return some basic information about the API',
          'inputs':{}
        }
      }
    }
  },

  run: function(api, connection, next) {
    connection.response.documentation = api.documentation.documentation;
    next(connection, true);
  }
};
