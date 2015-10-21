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
      })
      .state("login", {
        url: "/login",
        templateUrl: "/views/login.html",
        controller: "AuthCtrl"
      });

    // For any unmatched url, redirect to the login page (which redirects to
    // the calendar if it's authed)
    $urlRouterProvider.otherwise("/diddleplan");

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  });
