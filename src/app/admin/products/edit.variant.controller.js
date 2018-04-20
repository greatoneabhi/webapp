(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .controller('editVariantController', editVariantController);
  
  editVariantController.$inject = ['$scope', '$http', '$q', '$state', 'productService'];
  
  function editVariantController($scope, $http, $q, $state, productService) {
    console.log("inside editVariantController");
    
    var ctrl = this;
    ctrl.variant = $state.params.variant;
  }
  
})();