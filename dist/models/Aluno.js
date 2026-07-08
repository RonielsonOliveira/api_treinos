"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize'); var _sequelize2 = _interopRequireDefault(_sequelize);
var _bcryptjs = require('bcryptjs'); var _bcryptjs2 = _interopRequireDefault(_bcryptjs);

 class Aluno extends _sequelize.Model {
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

        sobrenome: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Sobrenome precisa ter entre 3 e 255 caracteres",
            },
          },
        },

        email: {
          type: _sequelize2.default.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já existe",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },

        idade: {
          type: _sequelize2.default.INTEGER,
          validate: {
            isInt: {
              msg: "Idade precisa ser um número inteiro",
            },
          },
        },

        peso: {
          type: _sequelize2.default.FLOAT,
          validate: {
            isFloat: {
              msg: "Peso precisa ser número inteiro ou decimal",
            },
          },
        },

        altura: {
          type: _sequelize2.default.FLOAT,
          validate: {
            isFloat: {
              msg: "Altura precisa ser número inteiro ou decimal",
            },
          },
        },

        password: {
          type: _sequelize2.default.VIRTUAL,
          validate: {
            len: {
              args: [6, 50],
              msg: "Senha precisa ter entre 6 e 50 caracteres",
            },
          },
        },

        password_hash: {
          type: _sequelize2.default.STRING,
        },
      },
      {
        sequelize,
        tableName: "alunos",
      },
    );

    this.addHook("beforeSave", async (aluno) => {
      if (aluno.password) {
        aluno.password_hash = await _bcryptjs2.default.hash(aluno.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return _bcryptjs2.default.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Treino, { foreignKey: "aluno_id" });
    this.hasMany(models.Foto, { foreignKey: "aluno_id" });
  }
} exports.default = Aluno;
