'use strict';

angular.module('adminControllers').controller('GameListCtrl', ['$scope', function($scope) {
  $scope.games = [];
  $scope.game = {};
  $scope.allUsers = {};
  $scope.currentTeam = {};
  $scope.userId = null;

  var teamAlert = 'Initialize teams first!';
  var startAlert = 'Start game first!';
  var answerAlert = 'Answer question first!';
  $('#alert').hide();

  $scope.getUsers = function() {
    client.action('listUsers', {}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.allUsers = data.users;
        $scope.$digest();
      }
    });
  };

  function showAlert(message) {
    $('#alertMessage').text(message);
    $('#alert').slideDown('slow', function() {
      setTimeout(function() {
        $('#alert').slideUp('slow');
      }, 2000);
    });
  }

  $scope.getUsers();

  $scope.toggleUserList = function(team) {
    $scope.currentTeam = team;
    $('#addUserModal').modal('show');
  };

  $scope.toggleTeamEdit = function(team) {
    $scope.currentTeam = team;
    $('#teamModal').modal('show');
  };

  $scope.saveTeam = function() {
    var color = $scope.currentTeam.color.substr(1);
    client.action('updateTeam', {
      game: $scope.selectedGame.id,
      team: $scope.selectedGame.teams.indexOf($scope.currentTeam),
      name: $scope.currentTeam.name,
      color: color
    }, function(err, data) {
      if (data.error) {
        alert(data.error);
      } else {
        $scope.selectedGame.teams = data.game.teams;
        $('#teamModal').modal('hide');
        $scope.getGames();
      }
    });
  };

  $scope.cancelTeam = function() {
    $('#teamModal').modal('hide');
    $scope.currentTeam = {};
  };

  $scope.switchUserBetweenTeams = function() {

    client.action('switchUserBetweenTeams', {user: $scope.userId, game: $scope.selectedGame.id}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.selectedGame.teams = data.game.teams;
        $scope.getGames();
      }
    });
  };

  $scope.addUserToTeam = function(user) {
    client.action('addUserToGame', {user: user.id, game: $scope.selectedGame.id}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        client.action('addUserToTeam', {
          user: user.id,
          game: $scope.selectedGame.id,
          team: $scope.selectedGame.teams.indexOf($scope.currentTeam)
          }, function(err, data) {
            if (data.error) {
              console.log(data.error);
            } else {
              $('#addUserModal').modal('hide');
              $scope.selectedGame.teams = data.game.teams;
              $scope.getGames();
            }
          });
      }
    });
  };

  $scope.removeUserFromTeam = function(user) {
    client.action('removeUserFromTeam', {
      user: user.id,
      game: $scope.selectedGame.id
      }, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          client.action('removeUserFromGame', {user: user.id, game: $scope.selectedGame.id}, function(err, data) {
            if (data.error) {
              console.log(data.error);
            } else {
              $scope.selectedGame.teams = data.game.teams;
              $scope.getGames();
            }
          });
        }
      });
  };

  $scope.clearSelectedGame = function() {
    $scope.selectedGame = null;
    $scope.game = null;
  };

  $scope.startGame = function() {
    if ($scope.selectedGame) {
      client.action('startGame', {id: $scope.selectedGame.id}, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          $scope.selectedGame.startedAt = data.game.startedAt;
          $scope.$digest();
        }
      });
    }
  };

  $scope.selectUser = function(userId) {
    $scope.userId = userId;
  };

  $scope.currentUser = function(userId) {
    return $scope.userId === userId;
  };

  $scope.getGames = function() {
    client.action('listGames', {}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.games = data.games;
        $scope.$digest();
      }
    });
  };

  $scope.getGames();

  $scope.selectGame = function(game) {
    if (!$scope.selectedGame || $scope.selectedGame.id !== game.id) {
      client.action('showGame', {id: game.id}, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          $scope.selectedGame = jQuery.extend(true, {}, data.game);
          $scope.game = jQuery.extend(true, {}, data.game);
          $scope.$digest();
        }
      });
    }
  };

  $scope.deleteGame = function(gameId, event) {
    if (event) {
      event.stopPropagation();
      event.preventDefault();
    }
    client.action('deleteGame', {id: gameId}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.clearSelectedGame();
        $scope.getGames();
      }
    });
  };

  $scope.answeredWrong = function(answer) {
    return $scope.selectedGame.question.answer === answer.id && !$scope.selectedGame.question.answeredCorrectly;
  };

  $scope.answeredRight = function(answer) {
    return $scope.selectedGame.question.answer === answer.id && $scope.selectedGame.question.answeredCorrectly;
  };
  $scope.saveGame = function() {
    if ($scope.selectedGame.id) {

      client.action('updateGame', $scope.selectedGame, function(err, data) {
        if (data.error) {
          console.log(data.error);
        } else {
          $scope.getGames();
          $scope.clearSelectedGame();
        }
      });
    } else if ($scope.selectedGame.name) {
      $scope.addGame();
    }
  };

  $scope.resetGame = function() {
    if ($scope.selectedGame && $scope.game) {
      $scope.selectedGame = jQuery.extend(true, {}, $scope.game);
    }
  };

  $scope.currentGame = function(game) {
    return $scope.selectedGame && $scope.selectedGame.id === game.id;
  };

  $scope.askQuestion = function() {

    if (!$scope.selectedGame.startedAt) {
      showAlert(startAlert);
    } else if ($scope.selectedGame.question && !$scope.selectedGame.question.answeredAt) {
      showAlert(answerAlert);
    } else {
      client.action('askNextQuestion', {game: $scope.selectedGame.id}, function(err, data) {
        if (err || data.error) {
          console.log(err, data.error);
        } else {
          $scope.selectedGame = jQuery.extend(true, {}, data.game);
          $scope.game = jQuery.extend(true, {}, data.game);
          $scope.$digest();
        }
      });
    }
  };

  $scope.answerQuestion = function(answer) {
    var question = $scope.selectedGame.question;
    var user;
    if ($scope.selectedGame.teams[question.team].users.length === 0) {
      showAlert(teamAlert);
    } else {
      user = $scope.selectedGame.teams[question.team].users[0].id;
      client.action('answerQuestion', {
        game: $scope.selectedGame.id,
        user: user,
        answer: answer.id
      }, function(err, data) {
        $scope.selectedGame = jQuery.extend(true, {}, data.game);
        $scope.game = jQuery.extend(true, {}, data.game);

        $scope.$digest();
      });
    }

  };

  $scope.createGame = function() {
    client.action('createGame', function(err, data) {
      if (err || data.error) {
        console.log(err, data.error);
      } else {
        $scope.getGames();
      }
    });
  };

  $scope.addGame = function() {
    var game = jQuery.extend(true, {}, $scope.selectedGame);
    delete game.id;
    client.action('createGame', game, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.getGames();
        $scope.clearSelectedGame();
      }
    });
  };
}]);
