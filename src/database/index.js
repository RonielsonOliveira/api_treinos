import Sequelize from "sequelize";
import databaseConfig from "../config/database";
import Aluno from "../models/Aluno";
import User from "../models/User";
import Foto from "../models/Foto";
import FotoExercicio from "../models/FotoExercicio";
import Exercicio from "../models/Exercicio";
import Treino from "../models/Treino";
import TreinoExercicio from "../models/TreinoExercicio";
const models = [
  Aluno,
  User,
  Foto,
  FotoExercicio,
  Exercicio,
  Treino,
  TreinoExercicio,
];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));
models.forEach(
  (model) => model.associate && model.associate(connection.models),
);
