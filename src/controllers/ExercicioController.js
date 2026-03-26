import Exercicio from "../models/Exercicio";
import FotoExercicio from "../models/FotoExercicio";

class ExercicioController {
  async index(req, res) {
    try {
      const exercicios = await Exercicio.findAll({
        attributes: [
          "id",
          "nome",
          "descricao",
          "numerodeRepeticoes",
          "numerodeSeries",
        ],
        include: [
          {
            model: FotoExercicio,
            as: "FotoExercicios",
            attributes: ["url", "filename"],
            required: false,
          },
        ],
        order: [
          ["id", "DESC"],
          [FotoExercicio, "id", "DESC"],
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
      const exercicio = await Exercicio.create(req.body);
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

      const exercicio = await Exercicio.findByPk(id, {
        attributes: [
          "id",
          "nome",
          "descricao",
          "numerodeRepeticoes",
          "numerodeSeries",
        ],
        include: [
          {
            model: FotoExercicio,
            attributes: ["url", "filename"],
            required: false,
          },
        ],
        order: [
          ["id", "DESC"],
          [FotoExercicio, "id", "DESC"],
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

      const exercicio = await Exercicio.findByPk(id);
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

      const exercicio = await Exercicio.findByPk(id);
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

export default new ExercicioController();
