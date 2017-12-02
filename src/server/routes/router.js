var express = require('express');
var user = require('../controller/user.server.controller');
var router = express.Router();
var jwt = require('jsonwebtoken');

router.get('/', function(req, res) {
  res.send('Server is running');
});

router.post('/authenticate', user.signIn);
router.post('/users', user.register);

router.get('/user', isAuthenticatedUser, user.getUser);

function isAuthenticatedUser(req, res, next) {
  console.log('verify token');
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {
    jwt.verify(token, 'buycepsdotcomsecret', function(err, decoded) {
      if (err) {
        return res.json({
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