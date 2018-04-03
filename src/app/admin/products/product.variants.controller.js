(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .controller('productVariantsController', productVariantsController);
  
  productVariantsController.$inject = ['$scope', '$http', '$q', '$state', '$window', 'productService', 'variantService'];
  
  function productVariantsController($scope, $http, $q, $state, $window, productService, variantService) {
    var ctrl = this;
    /*ctrl.product = $state.params.productI;*/
    ctrl.variant = {};
    ctrl.variant.regions = [];
    
    console.log("inside productVariantsController: ", $state.params.productId);
    
    productService.get($state.params.productId)
      .then(function(response) {
        console.log(response.data);
        ctrl.product = response.data[0];
    }).catch(function(error) {
      console.log(error);
    });
    
    ctrl.createVariants = function() {
      console.log("Variant: ", ctrl.variant);
      ctrl.variant.regions.push(ctrl.region);
      console.log("Regions: ", ctrl.variant.regions);
      ctrl.product.variants.push(ctrl.variant);
      console.log("Product is ", ctrl.product);
      productService.update(ctrl.product)
        .then(function(response) {
        console.log(response.data);
      }).catch(function(error) {
        console.log("Error: ", error);
      });
    }
    
    ctrl.deleteVariant = function(productId, variant) {
      variantService.delete(productId, variant)
        .then(function(response) {
        console.log(response);
      }).catch(function(error) {
        console.log("Error: ", error);
      });
    }
    
    ctrl.editVariant = function(productId, variant) {
      console.log("Edit variant button click");
      $state.go('admin.editvariant');
    }
    
  }
})();