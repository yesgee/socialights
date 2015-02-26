'use strict';

exports.answerQuestion = {
  name: 'answerQuestion',
  description: 'I will answer a question',

  outputExample:{
    'valid':true,
    'points':100
  },
  inputs: {
    game: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    user: {
      required: true,
      formatter: function(s){ return String(s); }
    },
    answer: {
      required: true,
      formatter: function(n){ return parseInt(n); }
    }
  },

  run: function(api, connection, next) {
    connection.response.valid = true;
    connection.response.points = 200;
    next(connection, true);
  }
};
