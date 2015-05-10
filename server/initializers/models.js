'use strict';

var lpad = require('mout/string/lpad');

module.exports = {
  loadPriority:  1010,
  startPriority: 1010,
  stopPriority:  1010,

  initialize: function(api, next) {

    api.schemas = {};
    api.models = {};

    api.models.getRedisTime = function(cb) {
      api.redis.client.time(function(err, time) {
        if (err) { cb(err); } else {
          // Format to be consistent with Date.getTime()
          cb(null, Number(String(time[0]) + lpad(String(Math.round(time[1] / 1000)), 3, '0')));
        }
      });
    };

    api.chatRoom.add('room:demo');
    api.chatRoom.add('updates:models', function(created) {
      api.log('ChatRoom updates:models created.', 'debug');
    });

    api.models.setUpdated = function(model, doc, type) {
      api.log(model + ' ' + doc.id + ' has been ' + type + 'd.', 'debug');

      api.chatRoom.broadcast({}, 'updates:models', {
        model: model.toLowerCase(),
        id: doc.id,
        type: type
      }, function(err) {
        // Nothing to do here...
      });

      // Get current time in Redis
      api.models.getRedisTime(function(err, time) {
        if (err) {
          api.log('Error: Could not get time from Redis', 'error');
        } else {
          var args = [
            'updates',
            time,
            model.toLowerCase() + ':' + doc.id + ':' + type // User:5512654665ad5dad2f67381a:save
          ];
          api.redis.client.zadd(args, function(err, result) {
            if (err) { api.log('error saving update to Redis', 'error'); }
          });
        }
      });
    };

    // Loading the model definition from a file
    api.models.loadFile = function(fullFilePath, reload) {
      if (reload === null) {
        reload = false;
      }

      // Watch for changes
      api.watchFileAndAct(fullFilePath, function() {
        api.models.loadFile(fullFilePath, true);
      });

      // Load the model
      var model = require(fullFilePath);

      // Add model change hooks
      model.schema.plugin(function(schema, options) {

        schema.post('save', function(doc) { api.models.setUpdated(model.name, doc, 'save'); });

        schema.post('remove', function(doc) { api.models.setUpdated(model.name, doc, 'remove'); });

      });

      // Hook up to the API
      api.schemas[model.name] = model.schema;
      api.models[model.name] = model.initialize(api);

      api.log('model (re)loaded: ' + model.name + ', ' + fullFilePath, 'debug');
    };

    // Discover the models in the model paths
    api.config.general.paths.model.forEach(function(p) {
      api.utils.recursiveDirectoryGlob(p).forEach(function(f) {
        api.models.loadFile(f);
      });
    });

    next();
  }
};
