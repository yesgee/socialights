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
      when('/admin/questions', {
        templateUrl: 'app/partials/questions.html',
        controller: 'QuestionListCtrl'
      }).
      otherwise({
        redirectTo: '/admin/users'
      });
  }]);
