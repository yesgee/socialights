'use strict';

exports.default = {
  routes: function(api) {
    return {

      get: [
        { path: '/users', action: 'listUsers'},
        { path: '/users/:id', action: 'showUser'},
        { path: '/rooms', action: 'listRooms'},
        { path: '/rooms/:id', action: 'showRoom'},
        { path: '/rooms/search/:query', action: 'searchRooms'},
        { path: '/question/:id', action: 'showQuestion'},
        { path: '/games', action: 'listGames'},
        { path: '/games/:id', action: 'showGame'},
      ],
      post: [
        { path: '/users', action: 'createUser'},
        { path: '/rooms/:room/addUser', action: 'addUserToRoom'},
        { path: '/games', action: 'createGame'},
        { path: '/games/:game/teams', action: 'createTeam'},
        { path: '/games/:game/addUser', action: 'addUserToGame'},
        { path: '/games/:game/teams/:team/addUser', action: 'addUserToTeam'},
        { path: '/games/:game/switchTeams', action: 'switchUserBetweenTeams'},
        { path: '/games/:game/answerQuestion', action: 'answerQuestion'},
        { path: '/games/:game/start', action: 'startGame'},
      ],
      delete: [
        { path: '/rooms/:room/removeUser', action: 'removeUserFromRoom'},
        { path: '/games/:game/removeUser', action: 'removeUserFromGame'},
        { path: '/games/:game/teams/:team/removeUser', action: 'removeUserFromTeam'}
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
