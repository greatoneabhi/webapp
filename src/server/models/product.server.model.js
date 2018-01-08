'use strict';

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  title: {
    type: String,
    trim: true
  },
  quantity: {
    type: Number
  },
  description:[ {
    type: String
  }],
  category: {
    type: String
  },
  size: {
    type: String
  },
  region: {
    type: String
  },
  brand: {
    type: String
  },
  sellingPrice: {
    type: String
  },
  marketPrice: {
    type: String
  },
  flavour: {
    type: String
  },
  sku : {
    type: String
  },
  discount: {
    type: Number
  },
  hsnCode: {
    type: String
  },
  gstTax: {
    type: String
  },
  productImage: {
    type: String,
    default: 'images/image_icon.jpg'
  }
});

module.exports = mongoose.model('product', productSchema);