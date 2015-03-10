'use strict';

exports.updateQuestion = {
  name: 'updateQuestion',
  description: 'I will create a Room',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    },
    question: {
      required: false,
      formatter: function(s) { return String(s); }
    },
    answers: {
      required: false
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
        if (connection.params.question) {
          question.question = connection.params.question;
        }
        if (connection.params.answers) {
          question.answers = [];
          question.answers = connection.params.answers;
        }
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
    });
  }
};
