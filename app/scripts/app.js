'use strict';

/**
 * @ngdoc overview
 * @name diddleplanApp
 * @description
 * # diddleplanApp
 *
 * Main module of the application.
 */
angular
  .module('diddleplanApp', [
    'ui.router',
    'dndLists',
    'picardy.fontawesome',
    'diddleplanService',
    'duScroll'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/diddleplan");
    //
    // Now set up the states
    $stateProvider
      .state("calendar", {
        url: "/diddleplan",
        templateUrl: "/views/calendar.html",
        controller: "CalendarCtrl",
        resolve: {
          tasks: ['TaskData',
            function(tasks) {
              return tasks.getTasks();
            }
          ]
        }
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  });
