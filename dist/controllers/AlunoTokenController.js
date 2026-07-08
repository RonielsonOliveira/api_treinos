"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);
var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

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
    const aluno = await _Aluno2.default.findOne({ where: { email } });

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

    const token = _jsonwebtoken2.default.sign({ id, role: "aluno" }, process.env.TOKEN_SECRET, {
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

exports. default = new AlunoTokenController();
