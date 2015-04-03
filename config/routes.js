'use strict';

exports.default = {
  routes: function(api) {
    return {

      get: [
        { path: '/users', action: 'listUsers'},
        { path: '/users/:id', action: 'showUser'},
        { path: '/questions', action: 'listQuestions'},
        { path: '/questions/:id', action: 'showQuestion'},
        { path: '/games', action: 'listGames'},
        { path: '/games/:id', action: 'showGame'},
      ],

      post: [
        { path: '/users', action: 'createUser'},
        { path: '/users/:id', action: 'updateUser'},
        { path: '/questions', action: 'createQuestion'},
        { path: '/questions/:id', action: 'updateQuestion'},
        { path: '/games', action: 'createGame'},
        { path: '/games/:game/teams', action: 'createTeam'},
        { path: '/games/:game/users/:user', action: 'addUserToGame'},
        { path: '/games/:game/teams/users/:user', action: 'addUserToTeam'},
        { path: '/games/:game/teams/:team/users/:user', action: 'addUserToTeam'},
        { path: '/games/:game/switchTeams', action: 'switchUserBetweenTeams'},
        { path: '/games/:game/answerQuestion', action: 'answerQuestion'},
        { path: '/games/:game/askNextQuestion', action: 'askNextQuestion'},
        { path: '/games/:game/start', action: 'startGame'},
      ],

      delete: [
        { path: '/users/:id', action: 'deleteUser'},
        { path: '/questions/:id', action: 'deleteQuestion'},
        { path: '/games/:id', action: 'deleteGame'},
        { path: '/games/:game/users/:user', action: 'deleteUserFromGame'},
        { path: '/games/:game/teams/users/:user', action: 'deleteUserFromTeam'},
      ],

      put: [
      ]

      /* ---------------------
      routes.js

      For web clients (http and https) you can define an optional RESTful mapping to help route requests to actions.
      If the client doesn't specify and action in a param, and the base route isn't a named action, the action will attempt to be discerned from this routes.js file.

      Learn more here: http://www.actionherojs.com/docs/servers/web.html

      examples:

      get: [
        { path: '/users', action: 'usersList' }, // (GET) /api/users
        { path: '/search/:term/limit/:limit/offset/:offset', action: 'search' }, // (GET) /api/search/car/limit/10/offset/100
      ],

      post: [
        { path: '/login/:userID(^\\d{3}$)', action: 'login' } // (POST) /api/login/123
      ],

      all: [
        { path: '/user/:userID', action: 'user' } // (*) / /api/user/123
      ]

      ---------------------- */

    };
  }
};
