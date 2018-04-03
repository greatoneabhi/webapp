(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('productsController', productsController);

  productsController.$inject = ['$scope', '$http', '$q', '$state', '$window', 'productService'];

  function productsController($scope, $http, $q, $state, $window, productService) {
    console.log("products controller");

    var ctrl = this;
    ctrl.products = [];
    ctrl.brands = [];
    ctrl.brand = {};
    ctrl.brand.selected = "";
    ctrl.category = {};
    ctrl.subCategory = {}
    ctrl.category.selected = "";
    ctrl.subCategory.selected = "";

    ctrl.categories = [{
        name: "Protien",
        subCategories: ["Casein Protiens", "Natural Protiens", "Protien Blends", "Soy Proteins", "Whey Protein", "Whey Protein Isolate"]
      },
      {
        name: "Body Essentials",
        subCategories: ["Chromium", "Antioxidants", "Calcium Supplements", "Minerals", "Multi Vitamins", "Omega 3"]
      },
      {
        name: "Speciality Supplements",
        subCategories: ["Caffeine", "Glucosamine", "L-Arginine", "L-Carnitine", "Liver Detox", "Test Booster", "Zma", "Other"]
      },
      {
        name: "Intra Workout Essentials",
        subCategories: ["Glutamine", "Amino", "BCAA", "Glucose"]
      },
      {
        name: "Pre Workouts",
        subCategories: ["Creatines", "Nitric Oxide"]
      },
      {
        name: "Fat Loss Essentials",
        subCategories: ["CLA", "Fat Burners"]
      },
      {
        name: "Extras",
        subCategories: ["Protein Bars", "Protein Snacks"]
      },
      {
        name: "Mass Gainer",
        subCategories: ["Mass Gainer"]
      },
      {
        name: "Accessories",
        subCategories: ["Shakers"]
      }
    ];

    ctrl.refreshBrandSearch = function($select) {
      console.log("New brand is: ", $select.search);
      ctrl.brand.selected = $select.search;
    }

    //Get all products
    productService.getAll()
      .then(function(response) {
        ctrl.products = response.data;
      }).catch(function(error) {
        console.log('error: ', error);
      });

    //Get all brands
    productService.getBrands()
      .then(function(response) {
        ctrl.brands = response.data;
      }).catch(function(error) {
        console.log('error ', error);
      });

    ctrl.createProduct = function() {
      ctrl.product.brand = ctrl.brand.selected;
      ctrl.product.category = ctrl.category.selected.name;
      ctrl.product.subCategory = ctrl.subCategory.selected;
      productService.create(ctrl.product)
        .then(function(response) {
          console.log(response.data);
          $state.reload();
        }).catch(function(error) {
          console.log("error: ", error);
        });
    }

    ctrl.deleteProduct = function(product) {
      productService.delete(product)
        .then(function(response) {
          console.log('product deleted successfully')
          $state.reload();
        }).catch(function(error) {
          console.log('Error while deleting the product');
        });
    }

    ctrl.productVariants = function(productId) {
      console.log("productId: ", productId);
      $state.go('admin.productvariants', {
        productId: productId
      }, {location: true});
    }

    ctrl.editProduct = function(product) {
      $state.go('admin.editproduct', {
        editProduct: product
      });
    }

  }
})();