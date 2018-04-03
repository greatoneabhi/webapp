(function() {
  'use strict';
  
  var mongoose = require('mongoose');
  var product = mongoose.model('product');
  
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
})();