(function() {
  'use strict';
  
  angular.module('buycepsApp')
    .factory('variantService', variantService);
  
  variantService.$inject = ['$http', '$q'];
  
  function variantService($http, $q) {
    var service = {};
    
    service.delete = deleteVariant;
    
    return service;
    
    function deleteVariant(productId, variant) {
      var promise;
      var deferred = $q.defer();
      
      if(!promise) {
        promise = $http.put('/admin/variants/'+productId, variant)
          .then(function(response) {
            deferred.resolve(response);
        }).catch(function(error) {
            deferred.reject(error);
        });
        return deferred.promise;
      }
      return deferred.promise;
    }
  }
})();