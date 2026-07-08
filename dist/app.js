"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _express = require('express'); var _express2 = _interopRequireDefault(_express);
var _path = require('path');
var _cors = require('cors'); var _cors2 = _interopRequireDefault(_cors);
var _helmet = require('helmet'); var _helmet2 = _interopRequireDefault(_helmet);
var _expressdelay = require('express-delay'); var _expressdelay2 = _interopRequireDefault(_expressdelay);
var _dotenv = require('dotenv'); var _dotenv2 = _interopRequireDefault(_dotenv);

_dotenv2.default.config();
require('./database');

// Rotas
var _homeRoutes = require('./routes/homeRoutes'); var _homeRoutes2 = _interopRequireDefault(_homeRoutes);
var _userRoutes = require('./routes/userRoutes'); var _userRoutes2 = _interopRequireDefault(_userRoutes);
var _tokenRoutes = require('./routes/tokenRoutes'); var _tokenRoutes2 = _interopRequireDefault(_tokenRoutes);
var _photoRoutes = require('./routes/photoRoutes'); var _photoRoutes2 = _interopRequireDefault(_photoRoutes);
var _exerciciosRoutes = require('./routes/exerciciosRoutes'); var _exerciciosRoutes2 = _interopRequireDefault(_exerciciosRoutes);
var _treinoRoutes = require('./routes/treinoRoutes'); var _treinoRoutes2 = _interopRequireDefault(_treinoRoutes);
var _alunoRoutes = require('./routes/alunoRoutes'); var _alunoRoutes2 = _interopRequireDefault(_alunoRoutes);
var _alunoTokenRoutes = require('./routes/alunoTokenRoutes'); var _alunoTokenRoutes2 = _interopRequireDefault(_alunoTokenRoutes);
var _alunoTreinoRoutes = require('./routes/alunoTreinoRoutes'); var _alunoTreinoRoutes2 = _interopRequireDefault(_alunoTreinoRoutes);
const whiteList = [
  "http://localhost:3000",
  "http://localhost:3002",
  "http://192.168.1.105:3002",
  "http://127.0.0.1",
  "http://127.0.0.1:3002",
  "https://front-app-treinos.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // permite requisições sem origin (ex: imagens)
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
};

class App {
  constructor() {
    this.app = _express2.default.call(void 0, );
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      "/images",
      (req, res, next) => {
        res.setHeader(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, private",
        );
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        next();
      },
      _express2.default.static(_path.resolve.call(void 0, __dirname, "..", "uploads", "images")),
    );
    // CORS
    this.app.use(_cors2.default.call(void 0, corsOptions));

    this.app.use(_express2.default.urlencoded({ extended: true }));
    this.app.use(_express2.default.json());

    this.app.use(
      _helmet2.default.call(void 0, {
        crossOriginResourcePolicy: false,
      }),
    );
  }

  routes() {
    this.app.use("/", _homeRoutes2.default);
    this.app.use("/users", _userRoutes2.default);

    this.app.use("/tokens", _tokenRoutes2.default);
    this.app.use("/tokens/aluno", _alunoTokenRoutes2.default);
    this.app.use("/fotos", _photoRoutes2.default);
    this.app.use("/exercicios", _exerciciosRoutes2.default);
    this.app.use("/treinos", _treinoRoutes2.default);
    this.app.use("/alunos", _alunoRoutes2.default);
    this.app.use("/alunoPage", _alunoTreinoRoutes2.default);
  }

  start() {
    const port = process.env.APP_PORT || 3002;

    this.app.listen(port, "0.0.0.0", () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log("DB USER:", process.env.DATABASE_USERNAME);
      console.log("DB PASS:", process.env.DATABASE_PASSWORD);
    });
  }
}

exports. default = new App();
