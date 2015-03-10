'use strict';

var async = require('async');

var isObject = require('mout/lang/isObject');
var lowerCase = require('mout/string/lowerCase');
var forOwn = require('mout/object/forOwn');

module.exports = {
  loadPriority:  1015,
  startPriority: 1015,
  stopPriority:  1015,

  initialize: function(api, next) {

    api.actions.addPreProcessor(function(connection, actionTemplate, next) {
      connection.models = {};

      // Handle errors from the Model
      connection.handleModelError = function(error, next) {
        if (isObject(error) && error.name == 'ValidationError') {
          connection.response.error = 'Error: Validation Failed.';
          connection.response.errors = error.errors;
        } else {
          api.log('Model error: ' + error + '.', 'error');
          connection.response.error = 'Error: The database encountered an error.';
        }
        next(connection, true);
      };

      // Render the Model
      connection.renderModel = function(propName, model, connection, next) {
        model.getFullJSON(function(err, model) {
          if (err) { return connection.handleModelError(err, next); }

          connection.response.success = true;
          connection.response[propName] = model;

          next(connection, true);
        });
      };

      var models = [];
      forOwn(actionTemplate.inputs, function(options, paramName) {
        if (options.model) {
          models.push({
            modelName: options.model,
            paramName: paramName,
            propName: lowerCase(options.model),
            required: options.required
          });
        }
      });

      async.each(models, function(options, callback) {
        if (connection.params[options.paramName]) {
          try {
            var objectId = api.mongo.ObjectID(connection.params[options.paramName].toString());

            api.models[options.modelName].findById(objectId, function(err, model) {
              if (err) { return connection.handleModelError(err, next); }

              if (model) {
                connection.models[options.propName] = model;
                callback();
              } else if (options.required) {
                callback('Error: ' + options.modelName + ' with this id was not found.');
              } else {
                callback();
              }
            });
          } catch (e) {
            callback('Error: Invalid ' + options.modelName + ' ID.');
          }
        } else {
          callback();
        }
      }, function(error) {
        if (error) {
          connection.response.error = error;
          next(connection, false);
        } else {
          next(connection, true);
        }
      });

    }, api.config.general.defaultMiddlewarePriority);

    next();
  },

  start: function(api, next) {
    next();
  },

  stop: function(api, next) {
    next();
  }

};
