(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .controller('editVariantController', editVariantController);
  
  editVariantController.$inject = ['$scope', '$http', '$q', '$state', '$window', 'productService'];
  
  function editVariantController($scope, $http, $q, $state, $window, productService) {
    console.log("inside editVariantController");
  }
  
})();