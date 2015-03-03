'use strict';

exports.deleteQuestion = {
  name: 'deleteQuestion',
  description: 'I will delete a question',

  outputExample:{
    succes: true
  },
  inputs: {
    id: {
      required: true,
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    api.models.Question.findOneAndRemove(connection.params.id).exec(function(err, result) {
      if (err) {
        connection.response.error = err;
      } else if (result === null) {
        connection.response.error = 'Error: Question with this id was not found.';
      } else {
        connection.response.success = true;
        connection.response.question = result;
      }
      next(connection, true);
    });
  }
};
