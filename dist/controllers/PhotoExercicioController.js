"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _FotoExercicio = require('../models/FotoExercicio'); var _FotoExercicio2 = _interopRequireDefault(_FotoExercicio);

class PhotoExercicioController {
  async store(req, res) {
    try {
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ error: "Nenhum arquivo enviado" });
      }

      const { exercicio_id } = req.body;
      if (!exercicio_id) {
        return res.status(400).json({ error: "exercicio_id é obrigatório" });
      }

      const fotosCriadas = await Promise.all(
        files.map((file) =>
          _FotoExercicio2.default.create({
            originalname: file.originalname,
            filename: file.filename,
            exercicio_id,
          }),
        ),
      );

      return res.json({
        message: "Upload realizado com sucesso!",
        fotos: fotosCriadas,
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Erro interno do servidor" });
    }
  }
}

exports. default = new PhotoExercicioController();
