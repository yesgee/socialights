'use strict';

var mongoose = require('mongoose');

module.exports = {
  loadPriority:  1000,
  startPriority: 1000,
  stopPriority:  1000,

  initialize: function(api, next) {

    var config = api.config.mongodb;

    api.mongo = {};
    api.mongo.connectionString = 'mongodb://' + config.host + ':' + config.port + '/' + config.database;
    api.mongo.connection = mongoose.createConnection();
    api.mongo.db = null;

    /**
     * api.mongo.connect - Connect to the configured MonogDB server.
     *
     * @param function next callback (err, db)
     */
    api.mongo.connect = function(next) {
      if (api.mongo.db !== null) {
        api.log('Already connected to MongoDB.', 'debug');
        next(null, api.mongo.db);
        return;
      }

      api.mongo.connection.open(api.mongo.connectionString, config.options, function(err) {
        if (err) {
          api.log('Error connecting to MongoDB: ' + err, 'emerg');
          next(err);
          return;
        }
        api.mongo.db = api.mongo.connection.db;
        process.nextTick(function() {
          next(null, api.mongo.connection.db);
        });
      });
    };

    /**
     * api.mongo.disconnect - Disconnect from the MongoDB server.
     *
     * @param function next callback
     */
    api.mongo.disconnect = function(next) {
      api.log('Disconnecting from MongoDB', 'debug');
      mongoose.disconnect(function(err) {
        process.nextTick(function() {
          next();
        });
      });
    };

    api.mongo.connection.on('connected', function() {
      api.log('Connected to MongoDB', 'debug');
    });

    api.mongo.connection.on('disconnected', function() {
      api.log('Disconnected from MongoDB', 'debug');
      api.mongo.db = null;
    });

    api.mongo.connection.on('reconnected', function() {
      api.log('Reconnected to MongoDB', 'debug');
      api.mongo.db = api.mongo.connection.db;
    });

    api.mongo.connection.on('error', function(err) {
      api.log('MongoDB error: ' + err, 'emerg');
    });

    process.nextTick(function() {
      next();
    });
  },

  /**
   * start - This function is executed by ActionHero on startup.
   */
  start: function(api, next) {
    if (api.config.mongodb.autoConnect) {
      api.mongo.connect(next);
    } else {
      next();
    }
  },

  /**
   * stop - This function is executed by ActionHero on shutdown.
   */
  stop: function(api, next) {
    if (api.mongo.db !== null) {
      api.mongo.disconnect(next);
    } else {
      next();
    }
  }
};
