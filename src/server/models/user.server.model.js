'use strict';

var mongoose = require('mongoose');
var bcrypt = require('bcrypt');

var addressSchema = new mongoose.Schema({
  address: {
      type: String
  },
  pincode: {
    type: Number
  },
  city: {
    type: String
  },
  state: {
    type: String
  }
  
});

var userSchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      trim: true
    },
    email: {
      type: String,
      unique: true,
      required: true,
      trim: true
    },
    phone: {
      type: String,
      trim: true
    },
    password: {
      type: String,
      trim: true
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    billingAddress: addressSchema,
    shippingAddress: [addressSchema],
    loginDateTime: {
      type: Date
    },
    loggoutDateTime: {
      type: Date
    }
});

userSchema.methods.comparePassword = function(password) {
  return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model('user', userSchema);