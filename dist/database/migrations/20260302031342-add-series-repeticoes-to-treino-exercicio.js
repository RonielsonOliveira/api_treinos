"use strict";"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("treino_exercicio", "series", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3,
    });
    await queryInterface.addColumn("treino_exercicio", "repeticoes", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10,
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn("treino_exercicio", "series");
    await queryInterface.removeColumn("treino_exercicio", "repeticoes");
  },
};
