import Sequelize, { Model } from "sequelize";

export default class TreinoExercicio extends Model {
  static init(sequelize) {
    super.init(
      {},
      {
        sequelize,
        tableName: "treino_exercicio",
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Treino, { foreignKey: "treino_id" });
    this.belongsTo(models.Exercicio, { foreignKey: "exercicio_id" });
  }
}
