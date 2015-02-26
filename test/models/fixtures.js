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
