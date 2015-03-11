'use strict';

/* Controllers */

var adminControllers = angular.module('adminControllers', []);
var client = new ActionheroClient();

adminControllers.controller('UserListCtrl', ['$scope', function($scope) {
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
    if (!$scope.selectedUser || $scope.selectedUser._id !== user._id) {
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
    if ($scope.selectedUser) {
      console.log($scope.selectedUser);
      client.action('updateUser', {
        id: $scope.selectedUser._id,
        name: $scope.selectedUser.name
        }, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          $scope.getUsers();
          $scope.clearSelectedUser();
        }
      });
    }
  };

  $scope.resetUser = function() {
    if ($scope.selectedUser && $scope.user) {
      $scope.selectedUser = jQuery.extend({}, $scope.user);
    }
  };

  $scope.currentUser = function(user) {
    return $scope.selectedUser && $scope.selectedUser._id === user._id;
  };

  $scope.addUser = function() {
    var user = jQuery.extend({}, $scope.selectedUser);
    delete user._id;
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

// phonecatControllers.controller('PhoneDetailCtrl', ['$scope', '$routeParams', 'Phone',
//   function($scope, $routeParams, Phone) {
//     $scope.phone = Phone.get({phoneId: $routeParams.phoneId}, function(phone) {
//       $scope.mainImageUrl = phone.images[0];
//     });
//
//     $scope.setImage = function(imageUrl) {
//       $scope.mainImageUrl = imageUrl;
//     }
//   }]);
