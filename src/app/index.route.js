(function() {
  'use strict';

  angular.module('buycepsApp')
    .config(function($stateProvider, $urlRouterProvider, cfpLoadingBarProvider) {

      cfpLoadingBarProvider.includeSpinner = false;

      $urlRouterProvider.otherwise('app/home');

      $stateProvider

        .state('login', {
          url: '/login',
          templateUrl: 'client/login/login.html',
          controller: 'loginController',
          controllerAs: 'ctrl'
        })

        .state('register', {
          url: '/register',
          templateUrl: 'client/register/register.html',
          controller: 'registerController',
          controllerAs: 'ctrl'
        })

        .state('app', {
          url: '/app',
          templateUrl: 'client/navigation/navigation.html',
          controller: 'navigationController',
          controllerAs: 'ctrl'
        })

        .state('app.home', {
          url: '/home',
          templateUrl: 'client/home/home.html',
          controller: 'homeController',
          controllerAs: 'ctrl'
        })

        .state('app.profile', {
          url: '/profile',
          templateUrl: 'client/profile/profile.html',
          controller: 'profileController',
          controllerAs: 'ctrl'
        })

        .state('admin', {
          url: '/admin',
          templateUrl: 'admin/navigation/admin.html',
          controller: 'navigationController',
          controllerAs: 'ctrl'
        })

        .state('admin.users', {
          url: '/users',
          templateUrl: 'admin/users/users.html',
          controller: 'usersController',
          controllerAs: 'ctrl'
        })

        .state('admin.products', {
          url: '/products',
          templateUrl: 'admin/products/productsNew.html',
          controller: 'productsController',
          controllerAs: 'ctrl'
        })

        .state('admin.editproduct', {
          url: '/editproduct',
          params: { editProduct : null },
          templateUrl: 'admin/products/edit.product.html',
          controller: 'editProductController',
          constrollerAs: 'ctrl'
        })
    
        .state('admin.productvariants', {
          url: '/product/:productId',
          /*params: {
            product: null
          },*/
          templateUrl: 'admin/products/product.variants.html',
          controller: 'productVariantsController',
          controllerAs: 'ctrl'
        })
    
        .state('admin.editvariant', {
          url: '/productvariants/edit',
          params: {
            productId: null,
            variant: null
          },
          templateUrl: 'admin/products/edit.variant.html',
          controller: 'editVariantController',
          controllerAs: 'ctrl'
      })

        .state('admin.home', {
          url: '/home',
          templateUrl: 'admin/home/home.html'
        });
    })
    .run(function($http, $window, $rootScope, $state) {
      var token = $window.localStorage.getItem('auth_token');
      $http.defaults.headers.common['x-access-token'] = token;
    });

})();