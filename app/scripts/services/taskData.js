'use strict';

angular.module('diddleplanService', [])
  .factory('TaskData', function($http) {

    var urlBase = '/api';
    var taskDataFunctions = {};

    taskDataFunctions.getTasks = function() {
      return $http.get(urlBase + '/tasks');
    };

    taskDataFunctions.addTask = function(task) {
      return $http.post(urlBase + '/tasks', task);
    };

    taskDataFunctions.updateTask = function(task) {
      return $http.put(urlBase + '/tasks/' + task.taskID, task);
    };

    taskDataFunctions.formatTime = function(time) {
      var result, m;
      var re = /^\s*([01]?\d|2[0-3]):?([0-5]\d)?\s*$/;

      if ((m = time.match(re))) {
        result = (m[1].length === 2 ? "" : "0") + m[1] + ":" + (m[2] || "00");
      }

      return result;
    };

    return taskDataFunctions;
  });
