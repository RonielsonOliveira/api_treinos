import Treino from "../models/Treino";
import Exercicio from "../models/Exercicio";
import FotoExercicio from "../models/FotoExercicio";
class AlunoTreinoController {
  async index(req, res) {
    try {
      const alunoId = req.userId;

      const treinos = await Treino.findAll({
        where: { aluno_id: alunoId },
        attributes: ["id", "nome", "descricao"],
        include: [
          {
            model: Exercicio,
            attributes: ["id", "nome", "descricao"], //atributos de exercicio
            through: { attributes: ["numerodeSeries", "numerodeRepeticoes"] }, // inclui séries e repetições
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
      return res.status(400).json({ errors: [e.message] });
    }
  }
}

export default new AlunoTreinoController();
