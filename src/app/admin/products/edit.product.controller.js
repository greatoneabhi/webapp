(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .controller('editProductController', editProductController);
  
  editProductController.$inject = ['$scope', '$http', '$q', '$state', '$window', 'productService'];
  
  function editProductController($scope, $http, $q, $state, $window, productService) {
    var ctrl = this;
    console.log("Edit Product Controller: ", $state.params.editProduct);
  }
})();