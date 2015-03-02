'use strict';

var faker = require('faker');
var merge = require('mout/object/merge');

module.exports.User = function(data) {
  data = data || {};
  return merge({}, data, {
    name: faker.name.findName()
  });
};

module.exports.Room = function(data) {
  data = data || {};
  return merge({}, data, {
    name: faker.address.city() + ' Room',
    location: faker.address.streetAddress(),
    gameTypes: ['quiz']
  });
};

module.exports.Answer = function(data) {
  data = data || {};
  return merge({}, data, {
    answer: faker.lorem.sentence() + '.',
    correct: false,
    feedback: faker.lorem.sentence() + '.'
  });
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
  return merge({}, data, {
    question: faker.lorem.sentence() + '?',
    answers: answerList()
  });
};

module.exports.Team = function(data) {
  data = data || {};
  return merge({}, data, {
    name: 'Team ' + faker.name.lastName(),
    color: faker.internet.color()
  });
};

module.exports.AskedQuestion = function(data) {
  data = data || {};
  var asked = new Date(faker.date.recent().getTime() - 1000 * 60); // At least one minute ago
  return merge({}, data, {
    team: faker.random.number({ min:0, max:1 }),
    askedAt: asked,
    deadlineAt: new Date(asked.getTime() + 10 * 1000)
  });
};

module.exports.Game = function(data) {
  data = data || {};
  return merge({}, data, {
    gameType: 'quiz',
    startedAt: new Date()
  });
};
