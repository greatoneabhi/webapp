(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('navigationController', navigationController);

  navigationController.$inject = ['$rootScope', '$scope', '$http', '$state', '$window'];

  function navigationController($rootScope, $scope, $http, $state, $window) {
    console.log('navigation controller');
    var navigationCtrl = this;

    navigationCtrl.isLoggedIn = false;

    $http.get('/api/user')
      .then(function(response) {
        navigationCtrl.isLoggedIn = true;
        $rootScope.userDetails = response.data;
        navigationCtrl.name = response.data.name;
        navigationCtrl.email = response.data.email;
        console.log(response.data);
      }).catch(function(response) {
        console.log('Error: ', response.data);
        navigationCtrl.isLoggedIn = false;
      });

    navigationCtrl.logOut = function() {
      $window.localStorage.setItem('auth_token', '');
      $rootScope.userDetails = {};
      $http.defaults.headers.common['x-access-token'] = null;
    }
  }


})();