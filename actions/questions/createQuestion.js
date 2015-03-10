'use strict';

exports.createQuestion = {
  name: 'createQuestion',
  description: 'I will create a Room',

  outputExample: require('./sample_output.json'),

  inputs: {
    question: {
      required: true,
      formatter: function(s) { return String(s); }
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
