import multer from "multer";
import { extname, resolve } from "path";

// Função para gerar parte aleatória do nome do arquivo
const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

// Configuração do Multer
const uploadConfig = {
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      const fileName = `${Date.now()}_${aleatorio()}${extname(file.originalname)}`;
      cb(null, fileName);
    },
  }),
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(
        new multer.MulterError(
          "LIMIT_UNEXPECTED_FILE",
          "Arquivo precisa ser PNG ou JPG",
        ),
      );
    }
    cb(null, true);
  },
  limits: {
    files: 10, // limite de arquivos enviados por vez
    fileSize: 5 * 1024 * 1024, // limite de 5MB por arquivo
  },
};

// Exportando middleware para uso na rota
export const uploadImages = multer(uploadConfig).any(); // aceita qualquer nome de campo de arquivo
