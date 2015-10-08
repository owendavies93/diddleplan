'use strict';

angular.module('diddleplanApp')
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

    return taskDataFunctions;
  });

/**
 * @ngdoc function
 * @name diddleplanApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the diddleplanApp
 */
angular.module('diddleplanApp')
  .controller('CalendarCtrl', function ($scope, tasks, TaskData) {

    $scope.tasks = tasks.data;
    $scope.types = ['todo', 'exercise', 'meal', 'shopping'];

    $scope.removeTask = function(task) {
      for (var i = 0; i < $scope.tasks.length; ++i) {
        if ($scope.tasks[i].name === task.name && $scope.tasks[i].date === task.date) {
          $scope.tasks.splice(i, 1);
          break;
        }
      }
    };

    $scope.calendar = [Date.now()];

    // create some dates
    for (var i = 1; i < 9; ++i) {
      var oneDay = 86400000;
      $scope.calendar.push(Date.now() + oneDay * i);
    }

    $scope.addTask = function(type, date) {
      // TODO: Need to pass in or work these out
      var newTaskData = {
        "name": "",
        "taskType": type,
        "date": date,
        "moveable": true,
        "autoMoveable": null,
        "UserId": 1
      };

      TaskData.addTask(newTaskData)
        .success(function(response) {
          $scope.tasks.push(response);
        })
        .error(function(response) {
          console.log(response);
        });
    };

    $scope.updateTask = function(task) {
      TaskData.updateTask(task).error(function(response) {
        console.log(response);
      });
    };

    var shoppingItem = {
      name: 'Shopping',
      type: 'shopping'
    };

    $scope.calculateShoppingTrip = function() {
      var remainingMeals = $scope.meals.length;
      for (var i = 0; i < remainingMeals; ++i) {
        var items = $scope.calendar[i].items;
        console.log(items);

        for (var j = 0; j < items; ++j) {
          if (items[j].taskType === 'meal') {
            remainingMeals++;
          }
        }
      }

      $scope.calendar[remainingMeals].items.push(shoppingItem);
    };

    // $scope.calculateShoppingTrip();

    $scope.isTodo = function(value) {
      return (value.taskType === 'todo') && !value.date;
    };

    $scope.isExercise = function(value) {
      return (value.taskType === 'exercise') && !value.date;
    };

    $scope.isMeal = function(value) {
      return (value.taskType === 'meal') && !value.date;
    };

    $scope.isShopping = function(value) {
      return (value.taskType === 'shopping') && !value.date;
    };

    $scope.hasDate = function(value, date) {
      return value && value.date === date;
    };

  });
