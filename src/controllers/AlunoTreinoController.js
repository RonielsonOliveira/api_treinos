import Treino from "../models/Treino";
import Exercicio from "../models/Exercicio";
import FotoExercicio from "../models/FotoExercicio";

class AlunoTreinoController {
  // Aluno logado
  async index(req, res) {
    try {
      const alunoId = req.userId;

      const treinos = await Treino.findAll({
        where: {
          aluno_id: alunoId,
        },
        attributes: ["id", "nome", "descricao"],
        include: [
          {
            model: Exercicio,
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: ["numerodeSeries", "numerodeRepeticoes"],
            },
            include: [
              {
                model: FotoExercicio,
                attributes: ["id", "filename", "url"],
              },
            ],
          },
        ],
        order: [["id", "DESC"]],
      });

      return res.json(treinos);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }

  // Personal/Admin
  async show(req, res) {
    try {
      const { alunoId } = req.params;

      const treinos = await Treino.findAll({
        where: {
          aluno_id: alunoId,
        },
        attributes: ["id", "nome", "descricao"],
        include: [
          {
            model: Exercicio,
            attributes: ["id", "nome", "descricao"],
            through: {
              attributes: ["numerodeSeries", "numerodeRepeticoes"],
            },
            include: [
              {
                model: FotoExercicio,
                attributes: ["id", "filename", "url"],
              },
            ],
          },
        ],
        order: [["id", "DESC"]],
      });

      return res.json(treinos);
    } catch (e) {
      return res.status(400).json({
        errors: [e.message],
      });
    }
  }
}

export default new AlunoTreinoController();
