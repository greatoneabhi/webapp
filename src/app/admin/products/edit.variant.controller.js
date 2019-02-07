(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .controller('editVariantController', editVariantController);
  
  editVariantController.$inject = ['$scope', '$http', '$q', '$state', 'variantService'];
  
  function editVariantController($scope, $http, $q, $state, variantService) {
    console.log("inside editVariantController");
    
    var ctrl = this;
    
    ctrl.image_source = "images/product-icon.png";
    
    ctrl.variant = $state.params.variant;
    ctrl.productId = $state.params.productId;
    ctrl.region = {};
    
    ctrl.addRegion = function (region) {
      console.log("Add region");
      ctrl.variant.regions.push(region);
    }
    
    ctrl.updateVariant = function() {
      console.log("Product Id: ", ctrl.productId);
      console.log(ctrl.variant);
      variantService.update(ctrl.productId, ctrl.variant)
        .then(function(response) {
          console.log(response);
      }).catch(function(error) {
          console.log("Error: ", error);
      });
    }
  }
  
})();