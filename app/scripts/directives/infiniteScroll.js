'use strict';

angular.module('diddleplanApp')
  .directive('infiniteScroll', function($rootScope, $timeout) {
    return {
      link: function(scope, elem, attrs) {
        var $child = angular.element(attrs.infiniteScrollElem);
        var scrollDistance = 0;

        if (attrs.infiniteScrollDistance !== null) {
          scope.$watch(attrs.infiniteScrollDistance, function(value) {
            scrollDistance = parseInt(value, 10);
          });
        }

        var lastScrollTop = $child.scrollTop();
        var handler = function() {
          var currentScrollTop = $child.scrollTop();
          var shouldScroll, windowBottom;

          if (currentScrollTop > lastScrollTop) {
            // Scroll down
            windowBottom = $child[0].scrollHeight - ($child.scrollTop() + $child.height());
            shouldScroll = windowBottom < scrollDistance;

            if (shouldScroll) {
              if ($rootScope.$$phase) {
                scope.$eval(attrs.infiniteScrollDown);
              } else {
                scope.$apply(attrs.infiniteScrollDown);
              }
            }
          } else {
            // Scroll up
            shouldScroll = $child.scrollTop() < scrollDistance;

            // Don't call the scroll handler if we've just landed on the page
            // TODO: possibly a bit hacky
            if (shouldScroll && (lastScrollTop > 0 && currentScrollTop > 0)) {
              if ($rootScope.$$phase) {
                scope.$eval(attrs.infiniteScrollUp);
              } else {
                scope.$apply(attrs.infiniteScrollUp);
              }
              $child.scrollTop((scrollDistance * 3) + lastScrollTop);
            }
          }
          lastScrollTop = currentScrollTop;
          return;
        };

        $child.on('scroll', handler);

        return $timeout((function() {
          if (attrs.infiniteScrollImmediateCheck) {
            if (scope.$eval(attrs.infiniteScrollImmediateCheck)) {
              return handler();
            }
          } else {
            return handler();
          }
        }), 0);
      }
    };
  });
