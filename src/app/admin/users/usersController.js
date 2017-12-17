(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('usersController', ['$scope', '$http', function($scope, $http) {

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

      $http.get('http://port-8081.buyceps-abhikrsingh05446337.codeanyapp.com/api/users')
        .then(function(response) {
          usersCtrl.gridOptions.data = response.data;
        }).catch(function(err) {
          console.log("Error while fetching user data");
        });


    }]);

})();