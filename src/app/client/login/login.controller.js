(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('loginController', ['$scope', '$http', '$state', function($scope, $http, $state) {
      console.log("loginController");

      var loginCtrl = this;

      loginCtrl.submit = function() {
        console.log(loginCtrl.login);
        $http.post('http://port-8080.buyceps-abhikrsingh05446337.codeanyapp.com/api/authenticate', loginCtrl.login)
          .then(function(response) {
            console.log("login successfull");
            if (response.data.isAdmin) {
              $state.go('admin');
            } else {
              $state.go('app.home');
            }
          }).catch(function(data, status) {
            console.log('Error: ', status, data);
            loginCtrl.errorMessage = "Invalid email or password !"
            loginCtrl.loginFailed = true;
          });
      };
    }]);
})();