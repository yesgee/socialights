'use strict';

var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');

// Room Schema
var roomSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  gameTypes: [{ type: String, enum: ['quiz'] }]
});
roomSchema.plugin(timestamps);

// Initialize the Model for global MongoDB
var initialize = function(api) {
  return api.mongo.connection.model('Room', roomSchema);
};

module.exports = {
  name: 'Room',
  roomSchema: roomSchema,
  schema: roomSchema,
  initialize: initialize
};
