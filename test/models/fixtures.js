'use strict';

var faker = require('faker');
var merge = require('mout/object/merge');

module.exports.User = function(data) {
  data = data || {};
  return merge({}, {
    name: faker.name.findName()
  }, data);
};

module.exports.Answer = function(data) {
  data = data || {};
  return merge({}, {
    answer: faker.lorem.sentence() + '.',
    correct: false,
    feedback: faker.lorem.sentence() + '.'
  }, data);
};

var answerList = function() {
  var list = [];
  for (var i = 0; i < 4; i++) {
    list.push(module.exports.Answer());
  }
  var correctIdx = Math.floor(Math.random() * 4);
  list[correctIdx].correct = true;
  return list;
};

module.exports.Question = function(data) {
  data = data || {};
  return merge({}, {
    question: faker.lorem.sentence() + '?',
    answers: answerList()
  }, data);
};

module.exports.Team = function(data) {
  data = data || {};
  return merge({}, {
    name: 'Team ' + faker.name.lastName(),
    color: faker.internet.color()
  }, data);
};

module.exports.AskedQuestion = function(data) {
  data = data || {};
  var asked = new Date(faker.date.recent().getTime() - 1000 * 60); // At least one minute ago
  return merge({}, {
    team: faker.random.number({ min:0, max:1 }),
    askedAt: asked,
    deadlineAt: new Date(asked.getTime() + 10 * 1000)
  }, data);
};

module.exports.Game = function(data) {
  data = data || {};
  return merge({}, {
    startedAt: new Date()
  }, data);
};
