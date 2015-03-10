'use strict';

exports.deleteQuestion = {
  name: 'deleteQuestion',
  description: 'I will delete a question',

  outputExample: {
    succes: true
  },

  inputs: {
    id: {
      required: true,
      model: 'Question',
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    connection.models.question.remove(function(err, question) {
      if (err) { return connection.handleModelError(err, next); }
      connection.response.success = true;
      next(connection, true);
    });
  }
};
