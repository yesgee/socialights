'use strict';

var pick = require('mout/object/pick');

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
      required: false,
      formatter: function(ans) {
        if (typeof ans === 'string') {
          return JSON.parse(ans);
        } else {
          return ans;
        }
      }
    },
  },

  run: function(api, connection, next) {
    var question = api.models.Question(pick(connection.params, ['question', 'answers']));

    question.save(function(err, question) {
      if (err) { return connection.handleModelError(err, next); }
      connection.renderModel('question', question, connection, next);
    });
  }
};
