'use strict';

/* Controllers */

var adminControllers = angular.module('adminControllers', []);
var client = new ActionheroClient();

adminControllers.controller('HeaderController', ['$scope', '$location', function($scope, $location) {
  $scope.isActive = function(viewLocation) {
    return viewLocation === $location.path();
  };
}]);
