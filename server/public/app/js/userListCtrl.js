'use strict';

angular.module('adminControllers').controller('UserListCtrl', ['$scope', function($scope) {
  $scope.users = [];
  $scope.user = {};

  $scope.clearSelectedUser = function() {
    $scope.selectedUser = null;
    $scope.user = null;
  };

  $scope.getUsers = function() {
    client.action('listUsers', {}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.users = data.users;
        $scope.$digest();
      }
    });
  };

  $scope.getUsers();

  $scope.selectUser = function(user) {
    if (!$scope.selectedUser || $scope.selectedUser.id !== user.id) {
      $scope.selectedUser = jQuery.extend({}, user);
      $scope.user = jQuery.extend({}, user);
    }
  };

  $scope.deleteUser = function(userId) {
    client.action('deleteUser', {id: userId}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.clearSelectedUser();
        $scope.getUsers();
      }
    });
  };

  $scope.saveUser = function() {
    if ($scope.selectedUser.id) {
      console.log($scope.selectedUser);
      client.action('updateUser', $scope.selectedUser, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          $scope.getUsers();
          $scope.clearSelectedUser();
        }
      });
    } else if ($scope.selectedUser.name) {
      $scope.addUser();
    }
  };

  $scope.resetUser = function() {
    if ($scope.selectedUser && $scope.user) {
      $scope.selectedUser = jQuery.extend({}, $scope.user);
    }
  };

  $scope.currentUser = function(user) {
    return $scope.selectedUser && $scope.selectedUser.id === user.id;
  };

  $scope.addUser = function() {
    var user = jQuery.extend({}, $scope.selectedUser);
    delete user.id;
    client.action('createUser', user, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.getUsers();
        $scope.clearSelectedUser();
      }
    });
  };
}]);
