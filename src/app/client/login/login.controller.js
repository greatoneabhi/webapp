(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('loginController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {
      console.log("loginController");

      var loginCtrl = this;
      loginCtrl.alert = null;

      loginCtrl.submit = function() {
        console.log(loginCtrl.login);
        $http.post('http://localhost:8081/api/authenticate', loginCtrl.login)
          .then(function(response) {
            if (response.data.isAdmin) {
              $state.go('admin');
            } else {
              $window.localStorage.setItem('auth_token', response.data.token);
              $state.go('app.home');
            }
          }).catch(function(err) {
            loginCtrl.alert = {
              type: 'danger',
              msg: err.data.message
            };
          });
      };

    }]);
})();