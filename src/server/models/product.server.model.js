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

var regionSchema = new mongoose.Schema({
  name: {
    type: String
  },
  quantity: {
    type: Number
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
  regions: [regionSchema]
});

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

/*var productSchema = new mongoose.Schema({
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
});*/

mongoose.exports = mongoose.model('category', categoryShema);
module.exports = mongoose.model('region', regionSchema);
module.exports = mongoose.model('variant', variantSchema);
module.exports = mongoose.model('product', productSchema);