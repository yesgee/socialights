'use strict';

angular.module('adminControllers').controller('GameListCtrl', ['$scope', function($scope) {
  $scope.games = [];
  $scope.game = {};

  $scope.clearSelectedGame = function() {
    $scope.selectedGame = null;
    $scope.game = null;
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
      $scope.selectedGame = jQuery.extend(true, {}, game);
      $scope.game = jQuery.extend(true, {}, game);
    }
  };

  $scope.deleteGame = function(gameId) {
    client.action('deleteGame', {id: gameId}, function(err, data) {
      if (data.error) {
        console.log(data.error);
      } else {
        $scope.clearSelectedGame();
        $scope.getGames();
      }
    });
  };

  $scope.saveGame = function() {
    if ($scope.selectedGame.id) {
      console.log($scope.selectedGame);
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
