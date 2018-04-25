(function() {
  'use strict';
  
  var mongoose = require('mongoose');
  var product = mongoose.model('product');
  var variant = mongoose.model('variant');
  
  //Delete variants
  exports.deleteVariant = function(req, res, next) {
    console.log("Product ID: ", req.params.productid);
    console.log("Delete Variant: ", req.body);
    product.findOneAndUpdate({
      _id : mongoose.Types.ObjectId(req.params.productid)
    }, {
      $pull: { variants: { _id : req.body._id }}
    }, function(err, product) {
      if (err) next(err);
      return res.send("variant removed successfully");
    });
  }
  
  exports.addVariant = function(req, res, next) {
    console.log('update product: ', req.body);
    product.find({
      _id: mongoose.Types.ObjectId(req.params.productId),
      variants: {
        $elemMatch: {
          region: req.body.region,
          sku: req.body.sku,
          flavour: req.body.flavour,
          size: req.body.size
        }
      }
    }, (err, productDb) => {
      console.log("lengh of product array: ", productDb.length);
      if (productDb.length === 0) {
        console.log("product is ", productDb);
        product.update({
          _id: mongoose.Types.ObjectId(req.params.productId)
        }, {
          $addToSet: { 'variants': req.body }
        }, (err, product) => {
          if(err) next(err);
          return res.send('updated product successfully');
        });
      } else {
        return res.status(409).json({
          message : "This entity already exists."
        })
      }
    });
  }
  
  exports.updateVariant = function(req, res, next) {
    console.log("update variants: ", req.body);
    console.log("Product Id: ", req.params.productId);
    
  }
  
})();