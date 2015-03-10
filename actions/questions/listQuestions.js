'use strict';

var map = require('mout/array/map');
var pick = require('mout/object/pick');

exports.listQuestions = {
  name: 'listQuestions',
  description: 'I will return a list of all questions',

  outputExample:{
    'questions': [
      require('./sample_output.json').question
    ]
  },

  run: function(api, connection, next) {
    api.models.Question.find(function(err, questions) {
      if (err) {
        connection.response.success = false;
        connection.response.error = err;
      } else {
        connection.response.success = true;
        connection.response.questions = map(questions, function(question) {
          return pick(question.toJSON(), ['id', '_id', 'question']);
        });
      }
      next(connection, true);
    });
  }
};
