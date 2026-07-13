import Treino from "../models/Treino";
import Exercicio from "../models/Exercicio";
import TreinoExercicio from "../models/TreinoExercicio";

class TreinoController {
  async index(req, res) {
    try {
      const treinos = await Treino.findAll({
        attributes: ["id", "nome", "descricao", "aluno_id", "dia_semana"],
        include: [
          {
            model: Exercicio,
            attributes: ["id", "nome"],
            through: {
              attributes: ["numerodeSeries", "numerodeRepeticoes"],
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
      const {
        nome,
        descricao,
        aluno_id,
        dia_semana,
        exercicios = [],
      } = req.body;

      if (!Array.isArray(exercicios)) {
        return res.status(400).json({
          errors: ["Exercícios precisa ser um array"],
        });
      }

      const treino = await Treino.create({
        nome,
        descricao,
        aluno_id,
        dia_semana,
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

      const treino = await Treino.findByPk(id, {
        attributes: ["id", "nome", "descricao", "aluno_id", "dia_semana"],
        include: [
          {
            model: Exercicio,
            attributes: ["id", "nome"],
            through: {
              attributes: ["numerodeSeries", "numerodeRepeticoes"],
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
      const {
        nome,
        descricao,
        aluno_id,
        dia_semana,
        exercicios = [],
      } = req.body;

      const treino = await Treino.findByPk(id, {
        include: {
          model: Exercicio,
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
        dia_semana,
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
            await TreinoExercicio.update(
              {
                numerodeSeries: ex.numerodeSeries ?? 3,
                numerodeRepeticoes: ex.numerodeRepeticoes ?? 10,
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
                numerodeSeries: ex.numerodeSeries ?? 3,
                numerodeRepeticoes: ex.numerodeRepeticoes ?? 10,
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

      const treino = await Treino.findByPk(id);

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

export default new TreinoController();
