'use strict';

var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: {
      type: String,
      required: true,
      trim: true
    }
});

module.exports = mongoose.model('product', productSchema);