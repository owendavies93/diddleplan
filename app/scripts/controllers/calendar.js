'use strict';

/**
 * @ngdoc function
 * @name diddleplanApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the diddleplanApp
 */
angular.module('diddleplanApp')
  .controller('CalendarCtrl', function ($scope, tasks, TaskData, ExerciseService) {

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

    // create some dates
    $scope.calendar = [];
    $scope.today = Date.now();
    var oneDay = 86400000;
    for (var i = -6; i < 12; ++i) {
      $scope.calendar.push(Date.now() + oneDay * i);
    }
    var now = new Date();
    $scope.lastYear = new Date(now.getFullYear() - 1, 0, 1).getTime();
    $scope.nextYear = new Date(now.getFullYear() + 1, 0, 1).getTime();

    $scope.loadPastDays = function() {
      var last = $scope.calendar[0];
      for (var i = -1; i >= -9; --i) {
        $scope.calendar.unshift(last + (oneDay * i));
      }
    };

    $scope.loadFutureDays = function() {
      var last = $scope.calendar[$scope.calendar.length - 1];
      for (var i = 1; i <= 9; ++i) {
        $scope.calendar.push(last + (oneDay * i));
      }
    };

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
      if (task.time === null || TaskData.formatTime(task.time) !== undefined) {
        TaskData.updateTask(task).error(function(response) {
          console.log(response);
        });
      }
    };

    var shoppingItem = {
      name: 'Shopping',
      type: 'shopping'
    };

    $scope.calculateShoppingTrip = function() {
      var remainingMeals = $scope.meals.length;
      for (var i = 0; i < remainingMeals; ++i) {
        var items = $scope.calendar[i].items;

        for (var j = 0; j < items; ++j) {
          if (items[j].taskType === 'meal') {
            remainingMeals++;
          }
        }
      }

      $scope.calendar[remainingMeals].items.push(shoppingItem);
    };

    $scope.getNewExercises = function() {
      ExerciseService.getExercises().success(function() {
        TaskData.getTasks().success(function(tasks) {
          $scope.tasks = tasks;
        });
      });
    };
    $scope.getNewExercises();

    $scope.addRecurrence = function(task) {
      // TODO
      console.log(task);
    };

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
