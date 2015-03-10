'use strict';

exports.showQuestion = {
  name: 'showQuestion',
  description: 'I will return all information about a single question',

  outputExample: require('./sample_output.json'),

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
