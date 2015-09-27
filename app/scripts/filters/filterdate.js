'use strict';

/**
 * @ngdoc filter
 * @name diddleplanApp.filter:filterDate
 * @function
 * @description
 * # filterDate
 * Filter in the diddleplanApp.
 */
angular.module('diddleplanApp')
  .filter('filterDate', function () {
    return function (tasks, timestamp) {
      var filtered = [];

      if (timestamp === undefined || timestamp === '') {
        return tasks;
      }

      angular.forEach(tasks, function(task) {
        if (task.date) {
          var date = new Date(timestamp);
          var taskDate = new Date(task.date);
          if (date.getDate() === taskDate.getDate() &&
              date.getMonth() === taskDate.getMonth() &&
              date.getYear() === taskDate.getYear()) {
            filtered.push(task);
          }
        }
      });

      return filtered;
    };
  });
