(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .factory('variantService', variantService);
  
  variantService.$inject = ['$http', '$q'];
  
  function variantService($http, $q) {
    var service = {};
    
    service.delete = deleteVariant;
    service.create = createVariant;
    service.update = updateVariant;
    
    return service;
    
    function deleteVariant(productId, variant) {
      var promise;
      var deferred = $q.defer();
      
      if(!promise) {
        promise = $http.put('/admin/delete_variants/'+productId, variant)
          .then(function(response) {
            deferred.resolve(response);
        }).catch(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
      }
      return deferred.promise;
    }
    
    function createVariant(productId, variant) {
      var promise;
      var deferred = $q.defer();
      
      if(!promise) {
        promise = $http.put('/admin/add_variants/'+productId, variant)
          .then(function(response) {
            deferred.resolve(response);
        }).catch(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
      }
      return deferred.promise;
    }
    
    function updateVariant(productId, variant) {
      console.log("Update variants service");
      var promise;
      var deferred = $q.defer();
      
      if(!promise) {
        promise = $http.put('/admin/update_variants/'+productId, variant)
          .then(function(response) {
          deferred.resolve(response);
        }).catch(function(error) {
          deferred.reject(error);
        });
        return deferred.promise;
      } 
      return deferred.promise
    }
  }
})();