'use strict';

var Schema = require('mongoose').Schema;
var timestamps = require('mongoose-timestamp');

var last = require('mout/array/last');
var findIndex = require('mout/array/findIndex');
var isFunction = require('mout/lang/isFunction');
var sortBy = require('mout/array/sortBy');

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
  answeredBy: { type: Schema.Types.ObjectId, ref: 'User' },
  answer: { type: Schema.Types.ObjectId }
});
askedQuestionSchema.plugin(timestamps);

// Instance Methods

askedQuestionSchema.methods.isOpen = function() {
  var answered = this.answer && this.answeredAt && this.answeredBy;
  return !answered && this.isInTime();
};

askedQuestionSchema.methods.isInTime = function() {
  var now = this.answeredAt || new Date();
  return now.getTime() <= this.deadlineAt.getTime();
};

// Game Schema
var gameSchema = new Schema({
  startedAt: { type: Date },
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  teams: [teamSchema],
  previousQuestions: [askedQuestionSchema], // Note: The last question in this array is the current question
  nextQuestions: [{ type: Schema.Types.ObjectId, ref: 'Question' }]
});
gameSchema.plugin(timestamps);

// Virtuals

gameSchema.virtual('question').get(function() {
  return last(this.previousQuestions);
});

// Instance Methods

gameSchema.methods.initializeTeams = function(callback) {
  if (this.teams.length !== 0) {
    callback('Error: Teams already initialized');
  } else {
    this.teams.push({ name: 'Red Team', color: '#ff0000', users: [], score: 0 });
    this.teams.push({ name: 'Blue Team', color: '#0000ff', users: [], score: 0 });
    this.save(callback);
  }
};

gameSchema.methods.userTeam = function(user) {
  return findIndex(this.teams, function(team) {
    return findIndex(team.users, user._id) != -1;
  });
};

gameSchema.methods.addUserToTeam = function(user, teamIdx, callback) {
  if (isFunction(teamIdx)) { callback = teamIdx; teamIdx = -1; }

  if (this.userTeam(user) >= 0) {
    callback('Error: This user is already in a team.');
    return;
  } else if (teamIdx < 0 || teamIdx > this.teams.length - 1) {
    var teams = sortBy(this.teams, function(team) { return team.users.length; });
    teams[0].users.addToSet(user._id);
  } else {
    this.teams[teamIdx].users.addToSet(user._id);
  }

  if (findIndex(this.users, user._id) < 0) {
    this.users.addToSet(user._id);
  }

  this.save(callback);
};

gameSchema.methods.removeUserFromTeam = function(user, callback) {
  var teamIdx = this.userTeam(user);
  if (teamIdx < 0) {
    callback('Error: This user is not in a team.');
  } else {
    this.teams[teamIdx].users.pull(user._id);
    this.save(callback);
  }
};

gameSchema.methods.switchTeam = function(user, callback) {
  var oldTeamIdx = this.userTeam(user);
  var newTeamIdx = (oldTeamIdx + 1) % this.teams.length;
  if (oldTeamIdx < 0) {
    callback('Error: This user is not in a team.');
  } else {
    this.teams[oldTeamIdx].users.pull(user._id);
    this.teams[newTeamIdx].users.addToSet(user._id);
    this.save(callback);
  }
};

gameSchema.methods.start = function(callback) {
  this.startedAt = new Date();
  this.save(callback);
};

gameSchema.methods.askNextQuestion = function(callback) {
  var lastAskedQuestion = last(this.previousQuestions);
  if (lastAskedQuestion && lastAskedQuestion.isOpen()) {
    callback('Error: The last question should be answered first.');
  } else {
    if (this.nextQuestions.length < 1) {
      callback('Error: There is no next question.');
    } else {
      var now = new Date();

      var nextTeam;
      if (lastAskedQuestion) {
        nextTeam = (lastAskedQuestion.team + 1) % this.teams.length;
      } else {
        nextTeam = 0;
      }

      var nextQuestion = {
        question: this.nextQuestions.shift(),
        team: nextTeam,
        askedAt: now,
        deadlineAt: new Date(now.getTime() + 10 * 1000)
      };
      this.previousQuestions.push(nextQuestion);
      this.save(callback);
    }
  }
};

gameSchema.methods.answerQuestion = function(user, answer, callback) {
  var _this = this;
  var answeredQuestion = this.question;

  if (answeredQuestion.team !== this.userTeam(user)) {
    callback('Error: Team ' + answeredQuestion.team + ' should answer this question.');
  } else {
    answeredQuestion.answer = answer;
    answeredQuestion.answeredBy = user._id;
    answeredQuestion.answeredAt = new Date();

    this.model('Question').findOne(answeredQuestion.question, function(err, result) {
      if (err) { return callback(err); }
      var correct = result.correctAnswer.id == answer.toString(); //TODO: Fix this.
      answeredQuestion.answeredCorrectly = correct;
      if (correct && answeredQuestion.isInTime()) {
        _this.teams[answeredQuestion.team].score++;
      }
      _this.save(function(err, result) {
        if (err) { return callback(err); }
        callback(null, answeredQuestion);
      });
    });
  }

};

gameSchema.methods.getFullJSON = function(callback) {
  var _this = this;
  this.populate('nextQuestions previousQuestions teams users', function(err, result) {
    if (err) { return callback(err); }
    _this.model('User').populate(_this.teams, { path: 'users' }, function(err, result) {
      if (err) { return callback(err); }
      callback(null, _this.toJSON({ virtuals: true }));
    });
  });
};

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
