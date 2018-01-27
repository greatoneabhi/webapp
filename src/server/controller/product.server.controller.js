(function() {
  'use strict'

  var mongoose = require('mongoose');
  var product = mongoose.model('product');

  //create
  exports.create = function(req, res, next) {
    console.log('create product: ', req.body);
    product.create(req.body).then(function(response) {
      return res.send(response);
    }).catch(function(err) {
      next(err);
    });
  }

  exports.update = function(req, res, next) {
    console.log('update product: ', req.body);
    product.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.body._id)
    }, req.body, {
      new: true
    }, function(err, product) {
      if (err) next(err);
      return res.send('updated product successfuly');
    });
  }

  exports.getAll = function(req, res, next) {
    console.log('get all products');
    product.find({}, function(err, products) {
      if (err) next(err);
      return res.send(products);
    })
  }

  exports.delete = function(req, res, next) {
    console.log('delete product: ', req.params.id);
    product.findByIdAndRemove({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, function(err, product) {
      if (err) next(err);
      return res.send('product deleted successfully');
    });
  }

  exports.upload = function(req, res, next) {
    console.log("inside upload: ", req.params.id);
    console.log(req.files[0].filename);

    product.findOneAndUpdate({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, {
      productImage: "uploads/" + req.files[0].filename
    }, function(err, product) {
      console.log("product image updated: " + product);
    })
    return res.send(req.files);
  }

  exports.getAllProductsForAllUsers = function(req, res, next) {
    console.log('get all products for all users');
    var pageOptions = {
      page: req.query.page || 0,
      limit: req.query.limit || 10
    }
    product.find()
      .skip(Number(pageOptions.page * pageOptions.limit))
      .limit(Number(pageOptions.limit))
      .exec(function(err, products) {
        if (err) next(err);
        return res.send(products);
      });
  }

  //Fake products for testing
  exports.createFakeProducts = function(req, res, next) {
    console.log('create fake products');
    for (var i = 0; i <= 100; i++) {
      var newProduct = new product();
      newProduct.name = "Product_" + i;
      newProduct.title = "Title_" + i;
      newProduct.quantity = 200;
      newProduct.description = "Desription_" + i;
      newProduct.category = "Category_" + i;

      product.create(newProduct).then(function(response) {
        //created
      }).catch(function(err) {
        next(err);
      });
    }
    return res.send("success");
  }
})();