'use strict';


exports.status = {
  name: 'showQuestion',
  description: 'I will return all information about a single question',

  outputExample:{
    'question': {
      'id': '1',
      'question': 'Is this the question?',
      'answers': [
        {
          'answer':'No.',
          'correct': false,
          'feedback': 'Come on, it\'s not so hard!'
        },
        {
          'answer':'Yes.',
          'correct': true,
          'feedback': 'Looks like you understand how this works.'
        },
        {
          'answer':'Banana.',
          'correct': false,
          'feedback': 'Wtf? Seriously?'
        },
        {
          'answer':'It depends.',
          'correct': false,
          'feedback': 'Maybe you should get some coffee...'
        }
      ]
    }
  },
  inputs: {
    id: {
      required: true,
      formatter: function(s){ return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.response.question = {};
    next(connection, true);
  }
};
