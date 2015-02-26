'use strict';

var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');

// Team Schema
var teamSchema = new Schema({
  name: { type: String, required: true },
  color: { type: String, required: true, match: /#([A-Fa-f0-9]{6})/ },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  score: { type: Number, required: true, min: 0, default: 0 }
});
teamSchema.plugin(timestamps);

// AskedQuestion Schema
var askedQuestionSchema = new Schema({
  question: { type: Schema.Types.ObjectId, required: true, ref: 'Question' },
  team: { type: Number, required: true },
  askedAt: { type: Date, required: true },
  deadlineAt: { type: Date, required: true },
  answeredAt: { type: Date },
  answer: { type: Number }
});
askedQuestionSchema.plugin(timestamps);

// Game Schema
var gameSchema = new Schema({
  gameType: { type: String, required: true, enum: ['quiz'] },
  startedAt: { type: Date },
  room: { type: Schema.Types.ObjectId, required: true, ref: 'Room' },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teams: [teamSchema],
  questions: [askedQuestionSchema],
  nextQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});
gameSchema.plugin(timestamps);

// Initialize the Model for global MongoDB
var initialize = function(api) {
  return api.mongo.connection.model('Game', gameSchema);
};

module.exports = {
  name: 'Game',
  teamSchema: teamSchema,
  askedQuestionSchema: askedQuestionSchema,
  gameSchema: gameSchema,
  schema: gameSchema,
  initialize: initialize
};
