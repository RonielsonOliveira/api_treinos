import Aluno from "../models/Aluno";
import jwt from "jsonwebtoken";

class AlunoTokenController {
  async store(req, res) {
    console.log(req.body);
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(401).json({
        errors: ["Email e senha são obrigatórios"],
      });
    }
    console.log("Email recebido:", email);
    console.log("Password recebido:", password);
    const aluno = await Aluno.findOne({ where: { email } });

    if (!aluno) {
      return res.status(401).json({
        errors: ["Aluno não encontrado"],
      });
    }

    const passwordIsValid = await aluno.passwordIsValid(password);

    if (!passwordIsValid) {
      return res.status(401).json({
        errors: ["Senha inválida"],
      });
    }

    const { id } = aluno;

    const token = jwt.sign({ id, role: "aluno" }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({
      token,
      aluno: {
        id,
        nome: aluno.nome,
        sobrenome: aluno.sobrenome,
        email: aluno.email,
      },
    });
  }
}

export default new AlunoTokenController();
