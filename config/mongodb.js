'use strict';

exports.default = {
  mongodb: function(api) {
    return {
      host: process.env.MONGO_PORT_27017_TCP_ADDR || '127.0.0.1',
      port: 27017,
      database: 'socialights',
      options: {},
      autoConnect: true
    };
  }
};

exports.test = {
  mongodb: function(api) {
    return {
      database: 'socialights-test',
      autoConnect: false
    };
  }
};
