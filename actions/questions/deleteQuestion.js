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
      formatter: function(s) { return String(s); }
    }
  },

  run: function(api, connection, next) {
    var questionId = new api.mongo.ObjectID(connection.params.id);

    api.models.Question.findByIdAndRemove(questionId, function(err, result) {
      if (err) {
        connection.response.error = err;
      } else if (result === null) {
        connection.response.error = 'Error: Question with this id was not found.';
      } else {
        connection.response.success = true;
      }
      next(connection, true);
    });
  }
};
