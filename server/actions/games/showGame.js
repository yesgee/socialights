'use strict';

exports.showGame = {
  name: 'showGame',
  description: 'I will return all information about a single game',

  outputExample: require('./sample_output.json'),

  inputs: {
    id: {
      required: true,
      model: 'Game',
      formatter: function(s) { return String(s); }
    },
  },

  run: function(api, connection, next) {
    connection.renderModel('game', connection.models.game, connection, next);
  }
};
