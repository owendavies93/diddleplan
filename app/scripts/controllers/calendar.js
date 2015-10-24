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

    $scope.convertRecurrences = function(task) {
      if (task.TaskRecurrences === undefined) {
        return;
      }

      for (var i = 0; i < task.TaskRecurrences.length; i++) {
        var r = task.TaskRecurrences[i];
        var r_task = {
          name: task.name,
          taskType: task.taskType,
          date: new Date(r.date).getTime(),
          time: r.time,
          moveable: false,
          autoMoveable: false,
          isRecurring: true,
          isRecurrence: true,
          TaskTaskID: task.taskID
        };

        $scope.tasks.push(r_task);
      }
    };

    $scope.removeRecurrences = function(task) {
      for (var i = 0; i < $scope.tasks.length; ++i) {
        if (!$scope.tasks[i].isRecurrence) {
          continue;
        }

        if ($scope.tasks[i].TaskTaskID === task.taskID) {
          $scope.tasks.splice(i, 1);
        }
      }
    };

    $scope.tasks = tasks.data;
    for (var i = 0; i < $scope.tasks.length; i++) {
      $scope.convertRecurrences($scope.tasks[i]);
    }
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
    for (var j = -6; j < 12; ++j) {
      $scope.calendar.push(Date.now() + oneDay * j);
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
      var timeRe = /^\s*([01]\d|2[0-3]):([0-5]\d)\s*$/;

      if (task.time !== null && task.time !== "") {
        if (!task.time.match(timeRe)) {
          task.validTime = false;
          return;
        }
      } else if (task.time === "") {
        task.time = null;
      }

      task.validTime = true;

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
          for (var i = 0; i < $scope.tasks.length; i++) {
            $scope.convertRecurrences($scope.tasks[i]);
          }
        });
      });
    };
    $scope.getNewExercises();

    $scope.addRecurrence = function(task) {
      TaskData.recurTask(task).success(function(response) {
        task.TaskRecurrences = response.task.TaskRecurrences;
        task.isRecurring = true;
        $scope.convertRecurrences(task);
      });
    };

    $scope.removeRecurrence = function(task) {
      TaskData.unrecurTask(task).success(function() {
        task.TaskRecurrences = [];
        task.isRecurring = false;
        task.recRange = undefined;
        task.recPeriod = undefined;
        $scope.removeRecurrences(task);
      });
    };

    $scope.updateRecurrence = function(task) {
      var tempRange = task.recRange;
      var tempPeriod = task.recPeriod;

      $scope.removeRecurrence(task);

      task.recRange = tempRange;
      task.recPeriod = tempPeriod;
      $scope.addRecurrence(task);
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
