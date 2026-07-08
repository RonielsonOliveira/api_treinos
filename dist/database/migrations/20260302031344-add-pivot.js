"use strict";"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("treino_exercicio", {
      treino_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "treino", key: "id" },
        onDelete: "CASCADE",
      },
      exercicio_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "exercicio", key: "id" },
        onDelete: "CASCADE",
      },
      numero_de_series: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 3,
      },
      numero_de_repeticoes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 10,
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("treino_exercicio");
  },
};
