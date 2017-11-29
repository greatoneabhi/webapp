(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('registerController', ['$scope', '$http', function($scope, $http) {
      console.log("registerController");

      var registerCtrl = this;

      registerCtrl.submit = function() {
        console.log($scope.user);
        $http.post('http://port-8080.buyceps-abhikrsingh05446337.codeanyapp.com/api/users', registerCtrl.user)
          .then(function(response) {
            console.log("user created");
            registerCtrl.successMsg = "Registration Successfull !";
            registerCtrl.registerSuccess = true;
          }).catch(function(response) {
            console.log('Error: ', response);
            registerCtrl.failedMessage = response.data;
            registerCtrl.registerFailed = true;
          });
      };
    }]);
})();