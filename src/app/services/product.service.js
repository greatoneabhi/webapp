(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .factory('productService', productService);
  
  productService.$inject = ['$http', '$q'];
  
  function productService($http, $q) {
    var service = {};
    
    //service.create = create;
    service.getAll = getAll;
    service.update = update;
    service.delete = deleteProduct;
    service.createProduct = createProduct;
    
    return service;
    
    function deleteProduct(product) {
      console.log('delete product: ', product);
      var promise;
      var deferred = $q.defer();
      if (!promise) {
        promise = $http.delete('/admin/products/'+product._id)
          .then(function(response) {
            deferred.resolve(response);
          }).catch(function(error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }
      return deferred.promise;
    }
    
    function getAll() {
      var promise;
      var deferred = $q.defer();
      if (!promise) {
        promise = $http.get('/admin/products')
          .then(function(response) {
            deferred.resolve(response);
          }).catch(function(error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }
      return deferred.promise;
    }
    
    function update(product) {
      var promise;
      var deferred = $q.defer();
      if (!promise) {
        promise = $http.put('/admin/products', product)
          .then(function(response) {
            deferred.resolve(response);
          }).catch(function(error) {
            deferred.reject(error);
          });
        return deferred.promise;
      }
      return deferred.promise;
    }
    
    function createProduct(product) {
      var promise;
      var deferred = $q.defer();
      if(!promise) {
        promise = $http.post('/admin/createproducts')
          .then(function(response) {
          deferred.resolve(response);
        }).catch(function(error) {
          deferred.reject(error);
        });
      }
    }
  }
  
})();