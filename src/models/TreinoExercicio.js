import Sequelize, { Model } from "sequelize";

export default class TreinoExercicio extends Model {
  static init(sequelize) {
    super.init(
      {
        treino_id: Sequelize.INTEGER,
        exercicio_id: Sequelize.INTEGER,
        numero_de_series: {
          type: Sequelize.INTEGER,
          defaultValue: 3,
        },
        numero_de_repeticoes: {
          type: Sequelize.INTEGER,
          defaultValue: 10,
        },
      },
      {
        sequelize,
        tableName: "treino_exercicio",
        timestamps: false,
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Treino, { foreignKey: "treino_id" });
    this.belongsTo(models.Exercicio, { foreignKey: "exercicio_id" });
  }
}
