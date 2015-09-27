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
    'picardy.fontawesome'
  ])
  .config(function($stateProvider, $urlRouterProvider, $locationProvider) {
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise("/");
    //
    // Now set up the states
    $stateProvider
      .state('calendar', {
        url: "/",
        templateUrl: "/views/calendar.html",
        controller: "CalendarCtrl"
      });

    // use the HTML5 History API
    $locationProvider.html5Mode(true);
  });
