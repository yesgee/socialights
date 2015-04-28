'use strict';

module.exports = {
  loadPriority:  1050,
  startPriority: 1050,
  stopPriority:  1050,
  initialize: function(api, next) {

    api.chatRoom.add('room:demo');

    next();
  },

  start: function(api, next) {
    next();
  },

  stop: function(api, next) {
    next();
  }
};
