import Sequelize, { Model } from "sequelize";

export default class TreinoExercicio extends Model {
  static init(sequelize) {
    super.init(
      {
        treino_id: Sequelize.INTEGER,
        exercicio_id: Sequelize.INTEGER,

        numerodeSeries: {
          type: Sequelize.INTEGER,
          defaultValue: 3,
          field: "numerodeSeries",
        },

        numerodeRepeticoes: {
          type: Sequelize.INTEGER,
          defaultValue: 10,
          field: "numerodeRepeticoes",
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
