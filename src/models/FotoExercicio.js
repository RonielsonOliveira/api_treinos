import Sequelize, { Model } from "sequelize";
import appConfig from "../config/appConfig";

export default class FotoExercicio extends Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: { notEmpty: { msg: "Campo nao pode ficar vazioo" } },
        },
        filename: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: { notEmpty: { msg: "Campo nao pode ficar vazio" } },
        },
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${appConfig.url}/images/${this.getDataValue("filename")}`;
          },
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
    // Cada foto pertence a um exercício
    this.belongsTo(models.Exercicio, {
      foreignKey: "exercicio_id",
      as: "exercicio",
    });
  }
}
