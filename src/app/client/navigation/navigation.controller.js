(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('navigationController', navigationController);
  navigationController.$inject = ['$scope', '$http', '$state', '$window', 'userService'];

  function navigationController($scope, $http, $state, $window, userService) {
    console.log('navigation controller');
    var ctrl = this;
    
    ctrl.image_source = "images/default_user_profile_image.png";
    
    $scope.regions = [{
        name: "Ranchi",
        code: "RNC"
      },
      {
        name: "Mumbai",
        code: "MUM"
      }
    ];

    ctrl.isLoggedIn = false;
    $scope.region = $window.localStorage.getItem('region_selected');
    if(!$scope.region) {
      console.log("region selected is: ", $scope.region);
      $('#selectLocationModal').modal({backdrop: true, keyboard: false, show: true});
      if($('#selectLocationModal').data('bs.modal')) {
       $('#selectLocationModal').data('bs.modal').options.backdrop = 'static'; 
      }
    }
    
    ctrl.saveRegion = function() {
      if($scope.region) {
        $window.localStorage.setItem('region_selected', $scope.region);
      }
    }
    
    ctrl.onRegionSelect = function() {
      console.log("region selected is: ", $scope.region);
    }

    userService.getUser()
      .then(function(response) {
        console.log("user: ", response.data.email);
        if(!response.data.email) {
          console.log("No user");
          ctrl.isLoggedIn = false;
          return;
        }
        ctrl.isLoggedIn = true;
        ctrl.name = response.data.name;
        ctrl.email = response.data.email;
        if (response.data.avatarImage) {
          console.log('image exists');
          ctrl.image_source = response.data.avatarImage;
          $scope.region = $window.localStorage.getItem('region_selected');
        }
      }).catch(function(error) {
        console.log("Error: ", error);
      });

    ctrl.logOut = function() {
      $window.localStorage.setItem('auth_token', '');
      $http.defaults.headers.common['x-access-token'] = null;
    }
  }
})();