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
    'duScroll',
    'mgcrea.ngStrap'
  ])
  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {

    // For any unmatched url, redirect to the login page (which redirects to
    // the calendar if it's authed)
    $urlRouterProvider.otherwise("/diddleplan");

    // use the HTML5 History API
    $locationProvider.html5Mode(true);

    $httpProvider.interceptors.push(function ($q, $location, $timeout) {
      return {
        responseError: function(response) {
          if (response.status === 401 && $location.path() !== '/login') {
            $timeout(function() {
              $location.path('/login');
            });
          }
          return $q.reject(response);
        }
      };
    });

    // Now set up the states
    $stateProvider
      .state("calendar", {
        url: "/diddleplan",
        templateUrl: "/views/calendar.html",
        controller: "CalendarCtrl",
        resolve: {
          tasks: function(TaskData) {
            return TaskData.getTasks();
          },
          user: function(AuthService) {
            return AuthService.currentUser();
          },
          auth: function(AuthService) {
            return AuthService.isAuthed();
          }
        }
      })
      .state("login", {
        url: "/login",
        templateUrl: "/views/login.html",
        controller: "AuthCtrl"
      });
  });
