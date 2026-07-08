"use strict";"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("treino_exercicio", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },

      treino_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "treino",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      exercicio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "exercicio",
          key: "id",
        },
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("treino_exercicio");
  },
};
