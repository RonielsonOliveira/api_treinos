import Sequelize, { Model } from "sequelize";

export default class FotoExercicio extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: { notEmpty: { msg: "Campo nao pode ficar vazio" } },
        },

        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
        },

        url: {
          type: Sequelize.STRING,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "fotosExercicio",
        underscored: true,
        timestamps: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Exercicio, {
      foreignKey: "exercicio_id",
      as: "exercicio",
    });
  }
}
