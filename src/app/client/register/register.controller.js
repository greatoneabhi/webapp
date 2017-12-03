(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('registerController', ['$scope', '$http', function($scope, $http) {
      console.log("registerController");

      var registerCtrl = this;

      registerCtrl.alert = null;

      registerCtrl.submit = function() {
        console.log($scope.user);
        $http.post('http://localhost:8081/api/users', registerCtrl.user)
          .then(function(response) {
            console.log("user created");
            registerCtrl.alert = {
              type: 'success',
              msg: 'Registration Successfull !'
            }
          }).catch(function(err) {
            registerCtrl.alert = {
              type: 'danger',
              msg: err.data
            };
          });
      };
    }]);
})();