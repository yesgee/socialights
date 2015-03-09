'use strict';

exports.showQuestion = {
  name: 'showQuestion',
  description: 'I will return all information about a single question',

  outputExample: {
    'question': {
      'id': '54fda3cadb3aba3500b8cdf0',
      '_id': '54fda3cadb3aba3500b8cdf0',
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
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    api.models.Question.findById(connection.params.id, function(err, question) {
      if (err) {
        connection.response.error = err;
        next(connection, true);
      } else if (question === null) {
        connection.response.error = 'Error: Question with this id was not found.';
        next(connection, true);
      } else {
        question.getFullJSON(function(err, result) {
          if (err) {
            connection.response.error = err;
          } else {
            connection.response.success = true;
            connection.response.question = result;
          }
          next(connection, true);
        });
      }
    });
  }
};
