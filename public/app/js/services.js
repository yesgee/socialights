'use strict';

/* Services */

var adminServices = angular.module('adminServices', ['ngResource']);

adminServices.factory('User', function($resource) {
  return $resource('/api/users');
});
