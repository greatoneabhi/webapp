(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('usersController', ['$scope', '$http', '$state', '$window', function($scope, $http, $state, $window) {

      console.log('users controller');

      var usersCtrl = this;
      var data = [];
      usersCtrl.gridOptions = {
        showGridFooter: true,
        showColumnFooter: false,
        enableFiltering: true,
        enableGridMenu: true,
        exporterMenuPdf: false,
        exporterMenuExcel: false,
        exporterCsvFilename: 'users.csv',
        columnDefs: [{
            field: '_id',
            enableFiltering: false,
            visible: false,
            width: '20%'
          },
          {
            field: 'name',
            width: '20%',
            cellTooltip: function(row, col) {
              return row.entity.name;
            },
            headerTooltip: function(col) {
              return 'Header: ' + col.displayName;
            }
          },
          {
            field: 'email',
            width: '20%',
            cellTooltip: function(row, col) {
              return row.entity.email;
            },
            headerTooltip: function(col) {
              return 'Header: ' + col.displayName;
            }
          },
          {
            name: 'phone',
            width: '20%'
          },
          {
            name: 'shippingAddress',
            width: '20%',
            enableFiltering: false,
            cellTooltip: function(row, col) {
              return row.entity.shippingAddress;
            },
            headerTooltip: function(col) {
              return 'Header: ' + col.displayName;
            }
          },
          {
            name: 'billingAddress',
            width: '20%',
            enableFiltering: false
          },
          {
            name: 'isAdmin',
            width: '20%'
          }
        ],
        onRegisterApi: function(gridApi) {
          $scope.gridApi = gridApi;
        },
        data: data
      };

      console.log("Get all users");
      var token = $window.localStorage.getItem('auth_token');
      $http.get('/api/users', {
        headers: {
          'x-access-token': token
        }
      }).then(function(response) {
        usersCtrl.gridOptions.data = response.data;
      }).catch(function(error) {
        console.log(error.data.message);
        $state.go('login');
      })

    }]);

})();