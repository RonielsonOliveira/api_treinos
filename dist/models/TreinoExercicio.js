"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class TreinoExercicio extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        treino_id: _sequelize2.default.INTEGER,
        exercicio_id: _sequelize2.default.INTEGER,

        numerodeSeries: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 3,
          field: "numerodeSeries",
        },

        numerodeRepeticoes: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 10,
          field: "numerodeRepeticoes",
        },
      },
      {
        sequelize,
        tableName: "treino_exercicio",
        timestamps: true,
        underscored: true,
      },
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Treino, { foreignKey: "treino_id" });
    this.belongsTo(models.Exercicio, { foreignKey: "exercicio_id" });
  }
} exports.default = TreinoExercicio;
