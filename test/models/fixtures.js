'use strict';

var faker = require('faker');
var deepFillIn = require('mout/object/deepFillIn');

module.exports.User = function(data) {
  return deepFillIn({}, data, {
    name: faker.name.findName()
  });
};

module.exports.Room = function(data) {
  return deepFillIn({}, data, {
    name: faker.address.city() + ' Room',
    location: faker.address.streetAddress(),
    gameTypes: ['quiz']
  });
};

module.exports.Answer = function(data) {
  return deepFillIn({}, data, {
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
  return deepFillIn({}, data, {
    question: faker.lorem.sentence() + '?',
    answers: answerList()
  });
};
