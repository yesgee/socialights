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

adminControllers.controller('QuestionListCtrl', ['$scope', function($scope) {
  $scope.questions = [];
  $scope.emptyQuestion = {
    question: '',
    answers: [{answer: ''},
    {answer: ''},
    {answer: ''},
    {answer: ''}]
  };
  $scope.clearSelectedQuestion = function() {
    $scope.selectedQuestion = jQuery.extend({}, $scope.emptyQuestion);
    $scope.question = jQuery.extend({}, $scope.selectedQuestion);
  };

  $scope.getQuestions = function() {
    client.action('listQuestions', {}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.questions = data.questions;
        $scope.$digest();
      }
    });
  };

  $scope.clearSelectedQuestion();
  $scope.getQuestions();

  $scope.selectQuestion = function(question) {
    if (!$scope.selectedQuestion || $scope.selectedQuestion.id !== question.id) {
      client.action('showQuestion', {id: question.id}, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          $scope.selectedQuestion = jQuery.extend({}, data.question);
          $scope.question = jQuery.extend({}, data.question);
          $scope.$digest();
        }
      });
    }
  };

  $scope.deleteQuestion = function(questionId) {
    client.action('deleteQuestion', {id: questionId}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.clearSelectedQuestion();
        $scope.getQuestions();
      }
    });
  };

  $scope.saveQuestion = function() {
    if ($scope.selectedQuestion) {
      console.log(JSON.stringify($scope.selectedQuestion.answers));
      client.action('updateQuestion', {
        id: $scope.selectedQuestion.id,
        question: $scope.selectedQuestion.question,
        answers: JSON.stringify($scope.selectedQuestion.answers)
      }, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          $scope.getQuestions();
          $scope.clearSelectedQuestion();
        }
      });
    }
  };

  $scope.resetQuestion = function() {
    if ($scope.selectedQuestion && $scope.question) {
      $scope.selectedQuestion = jQuery.extend({}, $scope.question);
    }
  };

  $scope.currentQuestion = function(question) {
    return $scope.selectedQuestion && $scope.selectedQuestion.id === question.id;
  };

  $scope.addQuestion = function() {
    var question = jQuery.extend({}, $scope.selectedQuestion);
    delete question.id;
    console.log(JSON.stringify(question.answers));
    client.action('createQuestion', {
      question: question.question,
      answers: JSON.stringify(question.answers)
    }, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.getQuestions();
        $scope.clearSelectedQuestion();
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
