"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _multerstoragecloudinary = require('multer-storage-cloudinary');
var _cloudinary = require('./cloudinary'); var _cloudinary2 = _interopRequireDefault(_cloudinary);

const storage = new (0, _multerstoragecloudinary.CloudinaryStorage)({
  cloudinary: _cloudinary2.default,
  params: {
    folder: "exercicios",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

 const uploadImages = _multer2.default.call(void 0, { storage }).array("fotos"); exports.uploadImages = uploadImages;
