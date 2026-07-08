"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class FotoExercicio extends _sequelize.Model {
  static init(sequelize) {
    super.init(
      {
        originalname: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: { notEmpty: { msg: "Campo nao pode ficar vazio" } },
        },

        filename: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
        },

        url: {
          type: _sequelize2.default.STRING,
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
} exports.default = FotoExercicio;
