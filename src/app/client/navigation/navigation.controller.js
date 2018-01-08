(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('navigationController', navigationController);
  navigationController.$inject = ['$scope', '$http', '$state', '$window', 'userService'];

  function navigationController($scope, $http, $state, $window, userService) {
    console.log('navigation controller');
    var navigationCtrl = this;

    navigationCtrl.isLoggedIn = false;
    
    $scope.image_source = "images/default_user_profile_image.png";
    
    userService.getUser()
      .then(function(response) {
        navigationCtrl.isLoggedIn = true;
        navigationCtrl.name = response.data.name;
        navigationCtrl.email = response.data.email;
        if(response.data.avatarImage) {
          $scope.image_source = response.data.avatarImage;
        }        
    });

    navigationCtrl.logOut = function() {
      $window.localStorage.setItem('auth_token', '');
      $http.defaults.headers.common['x-access-token'] = null;
    }
  }
})();