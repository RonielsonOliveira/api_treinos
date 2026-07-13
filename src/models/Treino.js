import Sequelize, { Model } from "sequelize";

export default class Treino extends Model {
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
        aluno_id: {
          type: Sequelize.INTEGER,
          allowNull: true,
        },
        dia_semana: {
          type: Sequelize.INTEGER,
          allowNull: false,
          defaultValue: 1,
          validate: {
            min: 1,
            max: 7,
          },
        },
      },
      {
        sequelize,
        tableName: "treino",
      },
    );
    return this;
  }

  static associate(models) {
    // Treino -> Aluno (opcional)
    this.belongsTo(models.Aluno, { foreignKey: "aluno_id" });

    // Treino <-> Exercício (N:N)
    this.belongsToMany(models.Exercicio, {
      through: models.TreinoExercicio,
      foreignKey: "treino_id",
      otherKey: "exercicio_id",
    });
  }
}
