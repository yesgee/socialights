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
