"use strict"; function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _database = require('../config/database'); var _database2 = _interopRequireDefault(_database);
var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Foto = require('../models/Foto'); var _Foto2 = _interopRequireDefault(_Foto);
var _FotoExercicio = require('../models/FotoExercicio'); var _FotoExercicio2 = _interopRequireDefault(_FotoExercicio);
var _Exercicio = require('../models/Exercicio'); var _Exercicio2 = _interopRequireDefault(_Exercicio);
var _Treino = require('../models/Treino'); var _Treino2 = _interopRequireDefault(_Treino);
var _TreinoExercicio = require('../models/TreinoExercicio'); var _TreinoExercicio2 = _interopRequireDefault(_TreinoExercicio);
const models = [
  _Aluno2.default,
  _User2.default,
  _Foto2.default,
  _FotoExercicio2.default,
  _Exercicio2.default,
  _Treino2.default,
  _TreinoExercicio2.default,
];

const connection = new (0, _sequelize2.default)(_database2.default);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
