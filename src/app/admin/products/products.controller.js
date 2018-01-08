(function() {
  'use strict';

  angular.module('buycepsApp')
    .controller('productsController', productsController);

  productsController.$inject = ['$scope', '$http', '$q', '$state', '$window', 'productService'];

  function productsController($scope, $http, $q, $state, $window, productService) {
    console.log("products controller");

    var ctrl = this;
    
    ctrl.product = {};
    
    ctrl.product.description = [];
    
    ctrl.addDescriptions = function() {
      console.log('add description');
      ctrl.product.description.push(ctrl.description);
      ctrl.description = "";
    }
    
    $scope.remove = function(index) {
    	ctrl.product.description.splice(index, 1);
    };

    $scope.image_source = "images/image_icon.jpg";

    ctrl.createProduct = function() {
      console.log("Create product: ", ctrl.product);

      $http.post('/api/product', ctrl.product)
        .then(function(response) {
          console.log('success');
          console.log('product is: ', response.data._id)
          ctrl.upload(response.data);

        }).catch(function(error) {
          console.log('error');
        });
    }

    ctrl.upload = function(product) {
      console.log('product id: ', product._id);
      var formData = new FormData();

      console.log("file: " + $scope.currentFile);
      formData.append('file', $scope.currentFile);

      $http.put('/api/product/upload/' + product._id, formData, {
          headers: {
            'Content-Type': undefined
          },
          transformRequest: angular.identity
        })
        .then(function(response) {
          console.log('image uploaded successfully');
        }).catch(function(error) {
          console.log('image upload error');
        })
    }

    var data = [];
    ctrl.gridOptions = {
      showGridFooter: true,
      showColumnFooter: false,
      enableFiltering: true,
      enableGridMenu: true,
      exporterMenuPdf: false,
      exporterMenuExcel: false,
      rowHeight: 60,
      exporterCsvFilename: 'products.csv',
      columnDefs: [{
          field: '_id',
          enableFiltering: false,
          enableCellEdit: false,
          visible: false,
          width: '20%'
        },
        {
          displayName: 'Product',
          field: 'productImage',
          enableFiltering: false,
          enableCellEdit: false,
          width: '10%',
          cellTemplate: '<img ng-src="{{COL_FIELD}}" width="80px" style="padding-left:20px">'
        },
        {
          field: 'name',
          width: '20%',
          //cellTemplate: '<div>{{COL_FIELD}}</div>',
          cellTooltip: function(row, col) {
            return row.entity.name;
          },
          headerTooltip: function(col) {
            return 'Header: ' + col.displayName;
          }
        },
        {
          field: 'title',
          width: '20%',
          //cellTemplate: '<div>{{COL_FIELD}}</div>',
          headerTooltip: function(col) {
            return 'Header: ' + col.displayName;
          }
        },
        {
          field: 'description',
          //cellTemplate: '<div>{{COL_FIELD}}</div>',
          enableFiltering: false,
          width: '20%'
        },
        {
          field: 'quantity',
          width: '20%',
          headerTooltip: function(col) {
            return 'Header: ' + col.displayName;
          }
        },
        {
          field: 'category',
          width: '20%',
        },
        {
          field: 'flavour',
          width: '20%'
        },
        {
          field: 'region',
          width: '20%'
        },
        {
          field: 'brand',
          width: '20%'
        },
        {
          field: 'sellingPrice',
          enableFiltering: false,
          width: '20%'
        },
        {
          field: 'marketPrice',
          enableFiltering: false,
          width: '20%'
        },
        {
          displayName: 'SKU',
          field: 'sku',
          enableFiltering: false,
          width: '20%'
        },
        {
          displayName: 'GST',
          field: 'gstTax',
          enableFiltering: false,
          width: '20%'
        },
        {
          displayName: 'HSN',
          field: 'hsnCode',
          enableFiltering: false,
          width: '20%'
        },
        {
          field: 'discount',
          width: '20%'
        },
        {
          displayName: 'Action',
          field: 'action',
          enableFiltering: false,
          width: '8%',
          cellTemplate: '<div style="padding:15px"><a href ng-click="grid.appScope.ctrl.deleteRow(row)"><span class="glyphicon glyphicon-trash text-danger"></span></a></div>'
        }
      ],
      onRegisterApi: function(gridApi) {
        $scope.gridApi = gridApi;
        gridApi.rowEdit.on.saveRow(null, ctrl.saveRow);
      },
      data: data
    };
    
    ctrl.deleteRow = function(row) {
      console.log(row.entity);
      productService.delete(row.entity)
        .then(function(response) {
        console.log('product deleted successfully')
      }).catch(function(error) {
        console.log('Error while deleting the product');
      });
      var index = ctrl.gridOptions.data.indexOf(row.entity);
      ctrl.gridOptions.data.splice(index, 1);
    };

    ctrl.saveRow = function(rowEntity) {
      console.log('save the entity: ', rowEntity);
      var promise = productService.update(rowEntity);
      $scope.gridApi.rowEdit.setSavePromise(rowEntity, promise);
    };

    productService.getAll()
      .then(function(response) {
        ctrl.gridOptions.data = response.data;
      }).catch(function(error) {
        console.log('error: ', error);
      });

    $scope.uploadedFile = function(element) {
      $scope.currentFile = element.files[0];
      var reader = new FileReader();
      reader.onload = function(event) {
        $scope.image_source = event.target.result
        $scope.$apply(function($scope) {
          $scope.files = element.files;
        });
      }
      reader.readAsDataURL(element.files[0]);

    }
  }

})();