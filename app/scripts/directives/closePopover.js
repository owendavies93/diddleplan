'use strict';

angular.module('diddleplanApp')
  .directive('closePopover', function() {
    return {
      restrict: 'EA',
      link: function() {
        var $cal = angular.element('.calendar');

        $cal.on('scroll', function() {
          angular.element('.popover').hide();
        });
      }
    };
  });
