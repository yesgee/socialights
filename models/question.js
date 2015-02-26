'use strict';

var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');

var filter = require('mout/array/filter');

// Answer Schema
var answerSchema = new Schema({
  answer: { type: String, required: true },
  correct: { type: Boolean, required: true },
  feedback: { type: String },
});
answerSchema.plugin(timestamps);

// Question Schema
var questionSchema = new Schema({
  question: { type: String, required: true },
  answers: [answerSchema]
});
questionSchema.plugin(timestamps);

// Validations
questionSchema.path('answers').validate(function(value) {
  return value.length >= 2;
}, 'not enough answers');

questionSchema.path('answers').validate(function(value) {
  return filter(value, function(val) { return val.correct === true; }).length === 1;
}, 'there should be exactly one correct answer');

// Initialize the Model for global MongoDB
var initialize = function(api) {
  return api.mongo.connection.model('Question', questionSchema);
};

module.exports = {
  name: 'Question',
  answerSchema: answerSchema,
  questionSchema: questionSchema,
  schema: questionSchema,
  initialize: initialize
};
