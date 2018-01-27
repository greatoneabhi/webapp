(function() {
  'use strict';

  const express = require('express');
  const router = express.Router();
  const jwt = require('jsonwebtoken');
  const multer = require('multer');
  const user = require('../controller/user.server.controller');
  const product = require('../controller/product.server.controller');

  var upload = multer({
    dest: 'src/app/uploads/'
  });

  router.get('/', function(req, res) {
    res.send('Server is running');
  });


  router.post('/authenticate', user.signIn);
  router.post('/user', user.register);
  router.get('/products', product.getAllProductsForAllUsers);
  router.post('/fakeproducts', product.createFakeProducts); 
  router.post('/fakeusers', user.createFakeUsers);

  //User API's
  router.route('/user')
    .get(isAuthenticatedUser, user.getUser)
    .put(isAuthenticatedUser, user.updateUser)
    .post(isAuthenticatedUser, upload.any(), user.uploadAvatar);

  function isAuthenticatedUser(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
      jwt.verify(token, 'buycepsdotcomsecret', function(err, decoded) {
        if (err) {
          console.log(err);
          return res.status(401).send({
            message: 'unauthorized !'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(403).send({
        message: 'Invalid token or No token'
      });
    }
  }
  
  module.exports = router;
})();