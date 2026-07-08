"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);

 class Treino extends _sequelize.Model {
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
        aluno_id: {
          type: _sequelize2.default.INTEGER,
          allowNull: true,
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
} exports.default = Treino;
