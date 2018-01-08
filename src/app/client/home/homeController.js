(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('homeController', homeController);
  
  homeController.$inject = ['$rootScope', '$scope'];
  function homeController($scope) {
      console.log('user details: '+$rootScope.userDetails);
    }

})();