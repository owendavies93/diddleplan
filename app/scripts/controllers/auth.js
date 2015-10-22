'use strict';

angular.module('diddleplanApp')
  .controller('AuthCtrl', function ($scope, $location, AuthService) {
    AuthService.isAuthed().then(function (response) {
      if (response.status === 200) {
        $location.path("/");
      }
    });

    $scope.login = function (username, password) {
      if (username !== undefined && password !== undefined) {
        AuthService.login(username, password).success(function() {
          $location.path("/");
        }).error(function(status, data) {
          console.log(status);
          console.log(data);
        });
      }
    };
  });
