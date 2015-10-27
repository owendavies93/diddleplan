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

    authFunctions.currentUser = function () {
      return $http.get(urlBase + '/users/current');
    };

    authFunctions.updateUser = function(preferences) {
      return $http.put(urlBase + '/users', preferences);
    };

    return authFunctions;
  });
