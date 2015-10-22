'use strict';

angular.module('diddleplanApp')
  .directive('scrollIf', function($timeout) {
    return {
      restrict: 'A',
      link: function(scope, elem, attrs) {
        var cond = scope.$eval(attrs.scrollIf);
        if (cond) {
          $timeout(function() {
            angular.element('.fixed-content').duScrollTo(0, elem[0].offsetTop - 15);
          });
        }
      }
    };
  });
