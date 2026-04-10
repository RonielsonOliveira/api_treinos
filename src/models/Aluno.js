import Sequelize, { Model } from "sequelize";
import bcryptjs from "bcryptjs";

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        nome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Nome precisa ter entre 3 e 255 caracteres",
            },
          },
        },

        sobrenome: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            len: {
              args: [3, 255],
              msg: "Sobrenome precisa ter entre 3 e 255 caracteres",
            },
          },
        },

        email: {
          type: Sequelize.STRING,
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
          type: Sequelize.INTEGER,
          validate: {
            isInt: {
              msg: "Idade precisa ser um número inteiro",
            },
          },
        },

        peso: {
          type: Sequelize.FLOAT,
          validate: {
            isFloat: {
              msg: "Peso precisa ser número inteiro ou decimal",
            },
          },
        },

        altura: {
          type: Sequelize.FLOAT,
          validate: {
            isFloat: {
              msg: "Altura precisa ser número inteiro ou decimal",
            },
          },
        },

        password: {
          type: Sequelize.VIRTUAL,
          validate: {
            len: {
              args: [6, 50],
              msg: "Senha precisa ter entre 6 e 50 caracteres",
            },
          },
        },

        password_hash: {
          type: Sequelize.STRING,
        },
      },
      {
        sequelize,
        tableName: "alunos",
      },
    );

    this.addHook("beforeSave", async (aluno) => {
      if (aluno.password) {
        aluno.password_hash = await bcryptjs.hash(aluno.password, 8);
      }
    });

    return this;
  }

  passwordIsValid(password) {
    return bcryptjs.compare(password, this.password_hash);
  }

  static associate(models) {
    this.hasMany(models.Treino, { foreignKey: "aluno_id" });
    this.hasMany(models.Foto, { foreignKey: "aluno_id" });
  }
}
