"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Exercicio extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Nome precisa ter entre 3 e 255 caracteres",
            },
          },
        },
        descricao: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Descrição precisa ter entre 3 e 255 caracteres",
            },
          },
        },
        numerodeRepeticoes: {
          type: _sequelize2.default.INTEGER,
          defaultValue: 0,
          field: "numerode_repeticoes",
        },
        numerodeSeries: {
          type: _sequelize2.default.INTEGER,
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
    this.hasMany(models.FotoExercicio, { foreignKey: "exercicio_id" });
  }
} exports.default = Exercicio;
