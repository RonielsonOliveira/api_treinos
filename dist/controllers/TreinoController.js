"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; } function _nullishCoalesce(lhs, rhsFn) { if (lhs != null) { return lhs; } else { return rhsFn(); } }var _Treino = require('../models/Treino'); var _Treino2 = _interopRequireDefault(_Treino);
var _Exercicio = require('../models/Exercicio'); var _Exercicio2 = _interopRequireDefault(_Exercicio);
var _TreinoExercicio = require('../models/TreinoExercicio'); var _TreinoExercicio2 = _interopRequireDefault(_TreinoExercicio);

class TreinoController {
  async index(req, res) {
    try {
      const treinos = await _Treino2.default.findAll({
        attributes: ["id", "nome", "descricao", "aluno_id"],
        include: [
          {
            model: _Exercicio2.default,
            attributes: ["id", "nome"],
            through: {
              attributes: ["numerodeSeries", "numerodeRepeticoes"], // ✅ corrigido
            },
          },
        ],
        order: [["id", "DESC"]],
      });

      return res.json(treinos);
    } catch (e) {
      return res.status(400).json({ errors: [e.message] });
    }
  }

  async store(req, res) {
    try {
      const { nome, descricao, aluno_id, exercicios = [] } = req.body;

      if (!Array.isArray(exercicios)) {
        return res.status(400).json({
          errors: ["Exercícios precisa ser um array"],
        });
      }

      const treino = await _Treino2.default.create({
        nome,
        descricao,
        aluno_id,
      });

      if (exercicios.length > 0) {
        for (const ex of exercicios) {
          await treino.addExercicio(ex.id, {
            through: {
              numerodeSeries: Number(ex.numerodeSeries),
              numerodeRepeticoes: Number(ex.numerodeRepeticoes),
            },
          });
        }
      }

      return res.json(treino);
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      const treino = await _Treino2.default.findByPk(id, {
        attributes: ["id", "nome", "descricao", "aluno_id"],
        include: [
          {
            model: _Exercicio2.default,
            attributes: ["id", "nome"],
            through: {
              attributes: ["numerodeSeries", "numerodeRepeticoes"], // ✅ necessário pro front
            },
          },
        ],
      });

      if (!treino) {
        return res.status(404).json({ errors: ["Treino não encontrado"] });
      }

      return res.json(treino);
    } catch (e) {
      return res.status(400).json({ errors: [e.message] });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;
      const { nome, descricao, aluno_id, exercicios = [] } = req.body;

      const treino = await _Treino2.default.findByPk(id, {
        include: {
          model: _Exercicio2.default,
          through: {
            attributes: ["numerodeSeries", "numerodeRepeticoes"],
          },
        },
      });

      if (!treino) {
        return res.status(404).json({ errors: ["Treino não encontrado"] });
      }

      await treino.update({
        nome,
        descricao,
        aluno_id,
      });

      if (Array.isArray(exercicios)) {
        const existentesMap = new Map(
          treino.Exercicios.map((ex) => [ex.id, ex]),
        );

        const novosIds = exercicios.map((ex) => ex.id);

        const paraRemover = treino.Exercicios.filter(
          (ex) => !novosIds.includes(ex.id),
        );

        for (const ex of paraRemover) {
          await treino.removeExercicio(ex);
        }

        for (const ex of exercicios) {
          const existente = existentesMap.get(ex.id);

          if (existente) {
            await _TreinoExercicio2.default.update(
              {
                numerodeSeries: _nullishCoalesce(ex.numerodeSeries, () => ( 3)),
                numerodeRepeticoes: _nullishCoalesce(ex.numerodeRepeticoes, () => ( 10)),
              },
              {
                where: {
                  treino_id: id,
                  exercicio_id: ex.id,
                },
              },
            );
          } else {
            await treino.addExercicio(ex.id, {
              through: {
                numerodeSeries: _nullishCoalesce(ex.numerodeSeries, () => ( 3)),
                numerodeRepeticoes: _nullishCoalesce(ex.numerodeRepeticoes, () => ( 10)),
              },
            });
          }
        }
      }

      return res.json(treino);
    } catch (e) {
      console.error(e);
      return res.status(400).json({
        errors: e.errors ? e.errors.map((err) => err.message) : [e.message],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      const treino = await _Treino2.default.findByPk(id);

      if (!treino) {
        return res.status(404).json({ errors: ["Treino não encontrado"] });
      }

      await treino.destroy();
      return res.json({ apagado: true });
    } catch (e) {
      return res.status(400).json({ errors: [e.message] });
    }
  }
}

exports. default = new TreinoController();
