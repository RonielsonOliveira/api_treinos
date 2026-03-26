"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _multer = require('multer'); var _multer2 = _interopRequireDefault(_multer);
var _path = require('path');

// Função para gerar parte aleatória do nome do arquivo
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

// Configuração do Multer
const uploadConfig = {
  storage: _multer2.default.diskStorage({
    destination: (req, file, cb) => {
      cb(null, _path.resolve.call(void 0, __dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}_${aleatorio()}${_path.extname.call(void 0, file.originalname)}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(
        new _multer2.default.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Arquivo precisa ser PNG ou JPG",
        ),
      );
    }
    cb(null, true);
  },
  limits: {
    files: 10, // limite de arquivos enviados por vez
    fileSize: 5 * 1024 * 1024, // limite de 5MB por arquivo
  },
};

// Exportando middleware para uso na rota
 const uploadImages = _multer2.default.call(void 0, uploadConfig).any(); exports.uploadImages = uploadImages; // aceita qualquer nome de campo de arquivo
