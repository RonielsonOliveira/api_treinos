"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Aluno = require('../models/Aluno'); var _Aluno2 = _interopRequireDefault(_Aluno);

class AlunoController {
  async index(req, res) {
    try {
      const alunos = await _Aluno2.default.findAll({
        order: [["id", "DESC"]],
      });

      return res.json(alunos);
    } catch (e) {
      return res.status(500).json({
        errors: ["Erro ao buscar alunos"],
      });
    }
  }

  async show(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ["Aluno não encontrado"],
        });
      }

      return res.json(aluno);
    } catch (e) {
      return res.status(500).json({
        errors: ["Erro ao buscar aluno"],
      });
    }
  }

  async store(req, res) {
    try {
      const aluno = await _Aluno2.default.create(req.body);
      return res.json(aluno);
    } catch (e) {
      if (e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }

      return res.status(500).json({
        errors: ["Erro ao criar aluno"],
      });
    }
  }

  async update(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ["Aluno não encontrado"],
        });
      }

      const alunoAtualizado = await aluno.update(req.body);

      return res.json(alunoAtualizado);
    } catch (e) {
      if (e.errors) {
        return res.status(400).json({
          errors: e.errors.map((err) => err.message),
        });
      }

      return res.status(500).json({
        errors: ["Erro ao atualizar aluno"],
      });
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({
          errors: ["ID não enviado"],
        });
      }

      const aluno = await _Aluno2.default.findByPk(id);

      if (!aluno) {
        return res.status(404).json({
          errors: ["Aluno não encontrado"],
        });
      }

      await aluno.destroy();

      return res.json({
        message: "Aluno deletado com sucesso",
      });
    } catch (e) {
      return res.status(500).json({
        errors: ["Erro ao deletar aluno"],
      });
    }
  }
}

exports. default = new AlunoController();
