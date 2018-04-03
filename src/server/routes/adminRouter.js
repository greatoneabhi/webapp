(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const jwt = require('jsonwebtoken');
  const multer = require('multer');
  const user = require('../controller/user.server.controller');
  const product = require('../controller/product.server.controller');
  const variant = require('../controller/variants.server.controller');

  var upload = multer({
    dest: 'src/app/uploads/'
  });
  
  router.route('/users')
    .get(isAuthenticatedAdmin, user.getAllUsers);
               

  router.route('/products')
    .get(isAuthenticatedAdmin, product.getAll)
    .post(isAuthenticatedAdmin, product.create)
    .put(isAuthenticatedAdmin, product.update);
  
  router.route('/createproducts')
    .post(isAuthenticatedAdmin, product.createProduct);

  router.route('/products/:id')
    .get(isAuthenticatedAdmin, product.get)
    .delete(isAuthenticatedAdmin, product.delete);

  router.route('/products/upload/:id')
    .delete(isAuthenticatedAdmin, upload.any(), product.upload);
  
  router.route('/variants/:productid')
    .put(isAuthenticatedAdmin, variant.deleteVariant);


  function isAuthenticatedAdmin(req, res, next) {
    //console.log("inside is admin method");
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, 'buycepsdotcomsecret', function(err, decoded) {
        if (err) {
          console.log(err);
          return res.status(401).json({
            message: 'unauthorized !'
          });
        } else {
          //console.log(decoded);
          req.decoded = decoded;
          if (decoded.isAdmin) {
            next();
          } else {
            return res.status(401).json({
              message: 'unauthorized !'
            });
          }
        }
      });
    } else {
      return res.status(403).json({
        message: 'Invalid token or No token'
      });
    }
  }

  module.exports = router;
})();