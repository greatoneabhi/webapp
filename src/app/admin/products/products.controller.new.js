(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .controller('productsController', productsController);
  
  productsController.$inject = ['$scope', '$http', '$q', '$state', '$window', 'productService'];
  
  function productsController($scope, $http, $q, $state, $window, productService) {
    console.log("products controller");
    
    var ctrl = this;
    
    ctrl.products = [];
    
    ctrl.categories = [
      {name: "Protien", subCategory: "Casein Protiens"},
      {name: "Protien", subCategory: "Natural Protiens"},
      {name: "Protien", subCategory: "Protien Blends"}
    ];
    
    //Get all products
    productService.getAll()
      .then(function(response) {
        console.log(response.data);
        ctrl.products = response.data;
      }).catch(function(error) {
        console.log('error: ', error);
      });
    
    //Create productSchema
    ctrl.createProduct = function() {
      ctrl.product.categories = ctrl.selected.categories;
      console.log(ctrl.product);
      productService.createProduct(ctrl.product)
        .then(function(response) {
        console.log(response.data);
      }).catch(function(error) {
        console.log("error: ", error);
      });
    }
  }
})();