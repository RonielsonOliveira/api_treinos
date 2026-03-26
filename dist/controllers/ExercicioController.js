"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Exercicio = require('../models/Exercicio'); var _Exercicio2 = _interopRequireDefault(_Exercicio);
var _FotoExercicio = require('../models/FotoExercicio'); var _FotoExercicio2 = _interopRequireDefault(_FotoExercicio);

class ExercicioController {
  async index(req, res) {
    try {
      const exercicios = await _Exercicio2.default.findAll({
        attributes: [
          "id",
          "nome",
          "descricao",
          "numerodeRepeticoes",
          "numerodeSeries",
        ],
        include: [
          {
            model: _FotoExercicio2.default,
            as: "FotoExercicios",
            attributes: ["url", "filename"],
            required: false,
          },
        ],
        order: [
          ["id", "DESC"],
          [_FotoExercicio2.default, "id", "DESC"],
        ],
      });
      return res.json(exercicios);
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message];
      return res.status(400).json({ errors });
    }
  }

  async store(req, res) {
    try {
      const exercicio = await _Exercicio2.default.create(req.body);
      return res.json(exercicio);
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message];
      return res.status(400).json({ errors });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ["Faltando ID"] });

      const exercicio = await _Exercicio2.default.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "descricao",
          "numerodeRepeticoes",
          "numerodeSeries",
        ],
        include: [
          {
            model: _FotoExercicio2.default,
            attributes: ["url", "filename"],
            required: false,
          },
        ],
        order: [
          ["id", "DESC"],
          [_FotoExercicio2.default, "id", "DESC"],
        ],
      });

      if (!exercicio)
        return res.status(400).json({ errors: ["Exercicio não existe"] });

      return res.json(exercicio);
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message];
      return res.status(400).json({ errors });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ["Faltando ID"] });

      const exercicio = await _Exercicio2.default.findByPk(id);
      if (!exercicio)
        return res.status(400).json({ errors: ["Exercicio não existe"] });

      const exercicioAtualizado = await exercicio.update(req.body);
      return res.json(exercicioAtualizado);
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message];
      return res.status(400).json({ errors });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ errors: ["Faltando ID"] });

      const exercicio = await _Exercicio2.default.findByPk(id);
      if (!exercicio)
        return res.status(400).json({ errors: ["Exercicio não existe"] });

      await exercicio.destroy();
      return res.json({ apagado: true });
    } catch (e) {
      const errors = e.errors
        ? e.errors.map((err) => err.message)
        : [e.message];
      return res.status(400).json({ errors });
    }
  }
}

exports. default = new ExercicioController();
