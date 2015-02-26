'use strict';

var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');

// User Schema
var userSchema = new Schema({
  name: { type: String, required: true }
});
userSchema.plugin(timestamps);

// Initialize the Model for global MongoDB
var initialize = function(api) {
  return api.mongo.connection.model('User', userSchema);
};

module.exports = {
  name: 'User',
  userSchema: userSchema,
  schema: userSchema,
  initialize: initialize
};
