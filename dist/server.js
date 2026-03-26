"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _app = require('./app'); var _app2 = _interopRequireDefault(_app);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

// carregar variáveis do .env
_dotenv2.default.config({ path: "/home/vboxuser/api/uploads/.env" });

// inicia o servidor
_app2.default.start();
