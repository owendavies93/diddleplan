'use strict';

angular.module('diddleplanService')
  .factory('AuthService', function ($http) {
    var urlBase = '/api';
    var authFunctions = {};

    authFunctions.isAuthed = function () {
      return $http.get(urlBase + '/users/authed');
    };

    authFunctions.login = function (username, password) {
      return $http.post(urlBase + '/users/login',
        { username: username, password : password });
    };

    return authFunctions;
  });
