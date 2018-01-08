'use strict';

var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');
var user = mongoose.model('user');

exports.register = function(req, res, next) {
  var newUser = new user(req.body);
  newUser.password = bcrypt.hashSync(req.body.password, 10);
  //newUser.isAdmin = true;
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

exports.signIn = function(req, res, next) {
  user.findOne({
    email: req.body.email
  }, function(err, user) {
    console.log("Sign in");
    if (err) next(err);
    console.log("check users");
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
      expiresIn: '6h',
    });

    if(req.body.rememberMe) {
      token = jwt.sign(payload, 'buycepsdotcomsecret');
    }
   
    return res.json({
      success: true,
      message: 'auth token',
      token: token,
      isAdmin: user.isAdmin
    });
  });
};

exports.updateUser = function(req, res, next) {
  console.log('update user: ', req.body);
  var newUser = {};
  newUser = Object.assign(newUser, req.body);
  newUser.isAdmin = false;
  user.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.decoded.id)
  }, newUser, {new: true}, function(err, user) {
    if (err) next(err);
    return res.send("updated user successfully");
  });
}

exports.getAllUsers = function(req, res, next) {
  console.log("get all users");
  user.find({}, {'password':0}, function(err, users) {
    if (err) next(err);
    return res.send(users);
  });
};

exports.getUser = function(req, res, next) {
  user.findOne({
    _id: mongoose.Types.ObjectId(req.decoded.id)
  }, {'password':0}, function(err, user) {
    if (err) next(err);
    return res.send(user);
  });
};

exports.uploadAvatar = function(req, res, next) {
  console.log("inside upload");
  console.log(req.files[0].filename);
  
  user.findOneAndUpdate({
    _id: mongoose.Types.ObjectId(req.decoded.id)
  }, { avatarImage: "uploads/"+req.files[0].filename }, function(err, user) {
    console.log("User image updated: "+user);
  })
  return res.send(req.files); 
};