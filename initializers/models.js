'use strict';

module.exports = {
  loadPriority:  1010,
  startPriority: 1010,
  stopPriority:  1010,

  initialize: function(api, next) {

    api.schemas = {};
    api.models = {};

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
