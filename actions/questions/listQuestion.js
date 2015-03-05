'use strict';

exports.status = {
  name: 'listQuestions',
  description: 'I will return a list of all questions',

  outputExample:{
    'question': [
      {
        '_id': '1',
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
    ]
  },
  run: function(api, connection, next) {
    api.models.Question.find(function(err, results) {
      if (err) {
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.questions = results;
      }
      next(connection, true);
    });
  }
};
