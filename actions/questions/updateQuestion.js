'use strict';

exports.updateQuestion = {
  name: 'updateQuestion',
  description: 'I will create a Room',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      model: 'Question',
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
    if (connection.params.question) {
      connection.models.question.set('question', connection.params.question);
    }

    if (connection.params.answers) {
      connection.models.question.set('answers', JSON.parse(connection.params.answers));
    }

    connection.models.question.save(function(err, question) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('question', question, connection, next);
    });
  }
};
