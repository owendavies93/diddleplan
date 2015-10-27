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

    taskDataFunctions.deleteTask = function(task) {
      return $http.delete(urlBase + '/tasks/' + task.taskID);
    };

    taskDataFunctions.recurTask = function(task) {
      return $http.post(urlBase + '/tasks/recur/' + task.taskID, {
        period: task.recPeriod,
        range: task.recRange
      });
    };

    taskDataFunctions.unrecurTask = function(task) {
      return $http.delete(urlBase + '/tasks/recur/' + task.taskID);
    };

    taskDataFunctions.deleteRecurrence = function(recurrence) {
      return $http.delete(urlBase + '/tasks/recurrence/' + recurrence.rID);
    };

    return taskDataFunctions;
  });
