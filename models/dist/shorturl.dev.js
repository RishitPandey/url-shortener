"use strict";

var mongoose = require('mongoose'),
    shortid = require('shortid');

var shorturlSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true
  },
  "short": {
    type: String,
    required: true,
    "default": shortid.generate
  },
  clicks: {
    type: Number,
    required: true,
    "default": 0
  }
});
module.exports = mongoose.model('ShortUrl', shorturlSchema);