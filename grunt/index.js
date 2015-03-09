'use strict';

var path = require('path');

module.exports = function(grunt) {
  // Load all the other tasks from the tasks directory
  grunt.loadTasks(path.join(__dirname, 'tasks'));
};
