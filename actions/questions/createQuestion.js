'use strict';

exports.createQuestion = {
  name: 'createQuestion',
  description: 'I will create a Room',

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
    question: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    answers: {
      required: true
    },
  },

  run: function(api, connection, next) {
    var question = api.models.Question({
      question: connection.params.question,
      answers: connection.params.answers
    });
    question.save(function(err, result) {
      if (err) {
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.question = result;
      }
      next(connection, true);
    });
  }
};
