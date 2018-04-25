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

  exports.createProduct = function(req, res, next) {
    console.log("create product: ", req.body);
    product.create(req.body).then(function(response) {
      return res.send(response);
    }).catch(function(err) {
      next(err);
    });
  }

  exports.update = function(req, res, next) {
    console.log('update product: ', req.body);
  }

  exports.getAll = function(req, res, next) {
    console.log('get all products');
    product.find({}, function(err, products) {
      if (err) next(err);
      return res.send(products);
    });
  }

  exports.get = function(req, res, next) {
    console.log("get product: ", req.params.id);
    product.find({
      _id: mongoose.Types.ObjectId(req.params.id)
    }, function(err, product) {
      if (err) next(err);
      return res.send(product);
    });
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

  exports.getBrands = function(req, res, next) {
    console.log("Get all brands");

    product.find().distinct('brand')
      .then(function(response) {
        res.send(response);
      }).catch(function(err) {
        next(err);
      });
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
})();