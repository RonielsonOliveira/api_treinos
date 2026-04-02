import Treino from "../models/Treino";
import Exercicio from "../models/Exercicio";

class TreinoController {
  async index(req, res) {
    try {
      const treinos = await Treino.findAll({
        attributes: ["id", "nome", "descricao", "aluno_id"],
        include: [
          {
            model: Exercicio,
            attributes: ["id", "nome"],
            through: {
              attributes: ["numerode_series  ", "numerode_repeticoes"],
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
    console.log("body" + req);
    try {
      const { nome, descricao, aluno_id, exercicios } = req.body;

      if (!Array.isArray(exercicios)) {
        return res.status(400).json({
          errors: ["Exercícios precisa ser um array"],
        });
      }

      const treino = await Treino.create({
        nome,
        descricao,
        aluno_id,
      });

      if (exercicios.length > 0) {
        await treino.setExercicios(
          exercicios.map((ex) => ex.id),
          {
            through: exercicios.reduce((acc, ex) => {
              acc[ex.id] = {
                numerodeSeries: ex.numerodeSeries,
                numerodeRepeticoes: ex.numerodeRepeticoes,
              };
              return acc;
            }, {}),
          },
        );
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
        attributes: ["id", "nome", "descricao", "aluno_id"],
        include: [
          {
            model: Exercicio,
            attributes: ["id", "nome"],
            through: { attributes: [] },
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
      const { nome, descricao, aluno_id, exercicios } = req.body;

      const treino = await Treino.findByPk(id);

      if (!treino) {
        return res.status(404).json({ errors: ["Treino não encontrado"] });
      }

      await treino.update({
        nome,
        descricao,
        aluno_id,
      });

      if (Array.isArray(exercicios)) {
        await treino.setExercicios(
          exercicios.map((ex) => ex.id),
          {
            through: exercicios.reduce((acc, ex) => {
              acc[ex.id] = {
                numerodeSeries: ex.numerodeSeries,
                numerodeRepeticoes: ex.numerodeRepeticoes,
              };
              return acc;
            }, {}),
          },
        );
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
