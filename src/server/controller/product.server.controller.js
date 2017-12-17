'use strict'

var mongoose = require('mongoose');
var product = mongoose.model('product');

exports.create = function(req, res, next) {
  console.log('create product');
}

exports.update = function(req, res, next) {
  console.log('update product');
}

exports.get = function(req, res, next) {
  console.log('get product');
}

exports.getAll = function(req, res, next) {
  console.log('get all products');
}