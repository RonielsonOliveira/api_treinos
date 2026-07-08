"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Treino = require('../models/Treino'); var _Treino2 = _interopRequireDefault(_Treino);
var _Exercicio = require('../models/Exercicio'); var _Exercicio2 = _interopRequireDefault(_Exercicio);
var _FotoExercicio = require('../models/FotoExercicio'); var _FotoExercicio2 = _interopRequireDefault(_FotoExercicio);
class AlunoTreinoController {
  async index(req, res) {
    try {
      const alunoId = req.userId;

      const treinos = await _Treino2.default.findAll({
        where: { aluno_id: alunoId },
        attributes: ["id", "nome", "descricao"],
        include: [
          {
            model: _Exercicio2.default,
            attributes: ["id", "nome", "descricao"], //atributos de exercicio
            through: { attributes: ["numerodeSeries", "numerodeRepeticoes"] }, // inclui séries e repetições
            include: [
              {
                model: _FotoExercicio2.default,
                attributes: ["id", "filename", "url"],
              },
            ],
          },
        ],
        order: [["id", "DESC"]],
      });

      return res.json(treinos);
    } catch (e) {
      return res.status(400).json({ errors: [e.message] });
    }
  }
}

exports. default = new AlunoTreinoController();
