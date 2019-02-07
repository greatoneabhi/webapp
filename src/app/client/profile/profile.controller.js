(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('profileController', profileController);

  profileController.$inject = ['userService', '$scope', '$http', '$state'];

  function profileController(userService, $scope, $http, $state) {
    console.log('profileController');

    var ctrl = this;

    ctrl.image_source = "images/default_user_profile_image.png";

    userService.getUser()
      .then(function(response) {
        ctrl.user = response.data;
        if(ctrl.user.avatarImage) {
          ctrl.image_source = ctrl.user.avatarImage;  
        }
      });

    ctrl.save = function() {
      console.log("user: ", ctrl.user);
      userService.updateUser(ctrl.user)
        .then(function(response) {
        console.log("user updated successfully");
      }).catch(function(error) {
        console.log("user update failed");
      });

    }
    
    $scope.upload = function() {
      
      console.log("uploading image");
      var formData = new FormData();
      
      console.log("file: "+$scope.currentFile);
      formData.append('file', $scope.currentFile);
      
      $http.post('/api/user/upload', formData, { headers: {'Content-Type': undefined }, transformRequest: angular.identity})
        .then(function(response) {
          console.log("success");
          $state.go('app.profile', {}, {reload:true});
        }).catch(function(err) {
          console.log("error");
        })
    }

    $scope.uploadedFile = function(element) {
      $scope.currentFile = element.files[0];
      var reader = new FileReader();
      reader.onload = function(event) {
        ctrl.image_source = event.target.result
        $scope.$apply(function($scope) {
         $scope.files = element.files;
        });
      }
      reader.readAsDataURL(element.files[0]);
    }

  }
})();