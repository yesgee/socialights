'use strict';

exports.showQuestion = {
  name: 'showQuestion',
  description: 'I will return all information about a single question',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      model: 'Question',
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.renderModel('question', connection.models.question, connection, next);
  }
};
