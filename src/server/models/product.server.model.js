'use strict';

var mongoose = require('mongoose');

var categoryShema = new mongoose.Schema({
  name: {
    type: String
  },
  subCategory: {
    type: String
  }
});

var variantSchema = new mongoose.Schema({
  sku: {
    type: String
  },
  description: {
    type: String
  },
  flavour: {
    type: String
  },
  size: {
    type: String
  },
  region: {
    type: String
  },
  quantity: {
    type: Number
  }
}, {_id: false});

var productSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  subCategory: {
    type: String
  },
  brand: {
    type: String
  },
  routine: {
    type: String
  },
  variants: [variantSchema]
});

mongoose.exports = mongoose.model('category', categoryShema);
module.exports = mongoose.model('variant', variantSchema);
module.exports = mongoose.model('product', productSchema);