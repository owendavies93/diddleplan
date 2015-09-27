'use strict';

/**
 * @ngdoc function
 * @name diddleplanApp.controller:CalendarCtrl
 * @description
 * # CalendarCtrl
 * Controller of the diddleplanApp
 */
angular.module('diddleplanApp')
  .controller('CalendarCtrl', function ($scope) {
    $scope.types = ['todo', 'exercise', 'meal', 'shopping'];

    $scope.tasks = [
      {
        name: 'Clean the bathrooms',
        type: 'todo',
        date: Date.now()
      },
      {
        name: 'Mow the lawn',
        type: 'todo'
      },
      {
        name: 'Washing',
        type: 'todo'
      },
      {
        name: 'Run',
        type: 'exercise'
      },
      {
        name: 'Beef Stir Fry',
        type: 'meal'
      },
      {
        name: 'Curry',
        type: 'shopping'
      }
    ];

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

    $scope.addItem = function(type, list) {
      $scope[list].push({
        name: '',
        type: type
      });
      // $scope.calculateShoppingTrip();
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
          if (items[j].type === 'meal') {
            remainingMeals++;
          }
        }
      }

      $scope.calendar[remainingMeals].items.push(shoppingItem);
    };

    // $scope.calculateShoppingTrip();

    $scope.isTodo = function(value) {
      return (value.type === 'todo') && !value.date;
    };

    $scope.isExercise = function(value) {
      return (value.type === 'exercise') && !value.date;
    };

    $scope.isMeal = function(value) {
      return (value.type === 'meal') && !value.date;
    };

    $scope.isShopping = function(value) {
      return (value.type === 'shopping') && !value.date;
    };

    $scope.hasDate = function(value, date) {
      console.log(value);
      return value &&  value.date === date;
    };

  });
