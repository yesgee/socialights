'use strict';

/* App Module */
var adminApp = angular.module('adminApp', [
  'ngRoute',
  'ngResource',

  'adminControllers',
  'adminServices'
]);

adminApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/admin/users', {
        templateUrl: 'app/partials/users.html',
        controller: 'UserListCtrl'
      }).
      when('/admin/games', {
        templateUrl: 'app/partials/games.html',
        controller: 'GameListCtrl'
      }).
      otherwise({
        redirectTo: '/admin/users'
      });
  }]);
