(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('navigationController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {
      console.log('navigation controller');
      var navigationCtrl = this;
      var token = $window.localStorage.getItem('auth_token');
      
      navigationCtrl.isLoggedIn = false;
      console.log("token is: " + token);
      if (token) {
        $http.get('http://port-8081.buyceps-abhikrsingh05446337.codeanyapp.com/api/user', {
            headers: {
              'x-access-token': token
            }
          })
          .then(function(response) {
            navigationCtrl.isLoggedIn = true;
            navigationCtrl.name = response.data.name;
            navigationCtrl.email = response.data.email;
            console.log(response.data);
          }).catch(function(data, status) {
            console.log('Error: ', status, data);
          });
      } else {
        navigationCtrl.isLoggedIn = false;
        console.log(navigationCtrl.isLoggedIn);
      }

      navigationCtrl.logOut = function() {
        $window.localStorage.setItem('auth_token', '');
      }
    }]);

})();