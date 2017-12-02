'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var user = mongoose.model('user');

exports.register = function(req, res, next) {
  var newUser = new user(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);

  user.create(newUser).then(function(user) {
    user.password = undefined;
    res.send(user);
  }).catch(function(err) {
    if (err.code == 11000) {
      err.status = 409;
      err.message = "User with the given Email Id already Exist.";
    }
    next(err);
  });
};

exports.signIn = function(req, res) {
  user.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user || !user.comparePassword(req.body.password)) {
      return res.status(401).json({
        message: 'Authentication failed. Invalid user or password.'
      });
    }
    const payload = {
      id: user._id,
      isAdmin: user.isAdmin
    };

    var token = jwt.sign(payload, 'buycepsdotcomsecret', {
      expiresIn: 1440,
    });
    return res.json({
      success: true,
      message: 'auth token',
      token: token,
      isAdmin: user.isAdmin
    });
  });
};

exports.getAllUser = function(req, res, next) {
  user.find({
    isAdmin: false
  }, function(err, users) {
    if (err) throw err;
    return res.send(users);
  });
}

exports.getUser = function(req, res, next) {
  user.findOne({
    _id: mongoose.Types.ObjectId(req.decoded.id)
  }, function(err, user) {
    if (err) throw err;
    return res.send(user);
  });
}