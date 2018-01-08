(function() {
  'use strict';

  angular.module('buycepsApp')
    .factory('userService', userService);

  userService.$inject = ['$http', '$q'];

  function userService($http, $q) {
    var service = {};

    service.getUser = getUser;

    return service;

    function getUser() {
      var promise;
      var deferred = $q.defer();
      if (!promise) {
        promise = $http.get('/api/user')
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