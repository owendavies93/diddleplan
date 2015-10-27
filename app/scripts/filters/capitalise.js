'use strict';

angular.module('diddleplanApp')
  .filter('capitalise', function() {
    return function(input) {
      if (input !== undefined) {
        input = input.toLowerCase();
        return input.substring(0, 1).toUpperCase() + input.substring(1);
      }
    };
  });
