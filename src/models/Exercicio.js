import Sequelize, { Model } from "sequelize";

export default class Exercicio extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Nome precisa ter entre 3 e 255 caracteres",
            },
          },
        },
        descricao: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Descrição precisa ter entre 3 e 255 caracteres",
            },
          },
        },
        numerodeRepeticoes: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          field: "numerode_repeticoes",
        },
        numerodeSeries: {
          type: Sequelize.INTEGER,
          defaultValue: 0,
          field: "numerode_series",
        },
      },
      {
        sequelize,
        tableName: "exercicio", // <--- nome exato da tabela no DB
      },
    );
    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Treino, {
      through: models.TreinoExercicio,
      foreignKey: "exercicio_id",
      otherKey: "treino_id",
    });

    this.hasMany(models.FotoExercicio, { foreignKey: "exercicio_id" });
  }
}
