(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('loginController', ['$scope', '$http', '$state', function($scope, $http, $state) {
      console.log("loginController");

      var loginCtrl = this;
      loginCtrl.alert = null;

      loginCtrl.submit = function() {
        console.log(loginCtrl.login);
        $http.post('http://port-8081.buyceps-abhikrsingh05446337.codeanyapp.com/api/authenticate', loginCtrl.login)
          .then(function(response) {
            if (response.data.isAdmin) {
              $state.go('admin');
            } else {
              $state.go('app.home', {
                'token': response.data.token
              });
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