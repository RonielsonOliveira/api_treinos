"use strict";Object.defineProperty(exports, "__esModule", {value: true});var _cloudinary = require('cloudinary');

_cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

exports. default = _cloudinary.v2;
