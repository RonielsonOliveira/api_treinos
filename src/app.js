import express from "express";
import { resolve } from "path";
import cors from "cors";
import helmet from "helmet";
import delay from "express-delay";
import dotenv from "dotenv";

dotenv.config();
import "./database";

// Rotas
import homeRoutes from "./routes/homeRoutes";
import userRoutes from "./routes/userRoutes";
import tokenRoutes from "./routes/tokenRoutes";
import photoRoutes from "./routes/photoRoutes";
import exercicioRoutes from "./routes/exerciciosRoutes";
import treinoRoutes from "./routes/treinoRoutes";
import alunoRoutes from "./routes/alunoRoutes";
import alunoTokenRoutes from "./routes/alunoTokenRoutes";
import alunoTreinoRoutes from "./routes/alunoTreinoRoutes";
const whiteList = [
  "http://localhost:3000",
  "http://localhost:3002",
  "http://192.168.1.105:3002",
  "http://127.0.0.1",
  "http://127.0.0.1:3002",
  "https://front-app-treinos.vercel.app",
];

const corsOptions = {
  origin: function (origin, callback) {
    // permite requisições sem origin (ex: imagens)
    if (!origin || whiteList.includes(origin)) {
      callback(null, true);
    } else {
      callback(null, false);
    }
  },
  credentials: true,
};

class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(
      "/images",
      (req, res, next) => {
        res.setHeader(
          "Cache-Control",
          "no-store, no-cache, must-revalidate, private",
        );
        res.setHeader("Pragma", "no-cache");
        res.setHeader("Expires", "0");
        next();
      },
      express.static(resolve(__dirname, "..", "uploads", "images")),
    );
    // CORS
    this.app.use(cors(corsOptions));

    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());

    this.app.use(
      helmet({
        crossOriginResourcePolicy: false,
      }),
    );
  }

  routes() {
    this.app.use("/", homeRoutes);
    this.app.use("/users", userRoutes);

    this.app.use("/tokens", tokenRoutes);
    this.app.use("/tokens/aluno", alunoTokenRoutes);
    this.app.use("/fotos", photoRoutes);
    this.app.use("/exercicios", exercicioRoutes);
    this.app.use("/treinos", treinoRoutes);
    this.app.use("/alunos", alunoRoutes);
    this.app.use("/", alunoTreinoRoutes);
  }

  start() {
    const port = process.env.APP_PORT || 3002;

    this.app.listen(port, "0.0.0.0", () => {
      console.log(`Servidor rodando na porta ${port}`);
      console.log("DB USER:", process.env.DATABASE_USERNAME);
      console.log("DB PASS:", process.env.DATABASE_PASSWORD);
    });
  }
}

export default new App();
