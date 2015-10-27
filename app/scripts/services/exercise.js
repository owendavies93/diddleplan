'use strict';

angular.module('diddleplanService')
  .factory('ExerciseService', function ($http) {
    var urlBase = '/api';
    var exerciseFunctions = {};

    exerciseFunctions.auth = function () {
      return $http.get(urlBase + '/exercises/auth');
    };

    exerciseFunctions.getExercises = function () {
      return $http.get(urlBase + '/exercises/');
    };

    return exerciseFunctions;
  });
