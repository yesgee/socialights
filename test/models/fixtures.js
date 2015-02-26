'use strict';

var faker = require('faker');
var deepFillIn = require('mout/object/deepFillIn');

module.exports.User = function(data) {
  return deepFillIn({}, data, {
    name: faker.name.findName()
  });
};
