"use strict";"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addColumn("treino_exercicio", "numerodeSeries", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 3, // ou qualquer valor padrão que você queira
    });

    await queryInterface.addColumn("treino_exercicio", "numerodeRepeticoes", {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 10, // ou outro valor padrão
    });
  },

  async down(queryInterface) {
    await queryInterface.removeColumn("treino_exercicio", "numerodeSeries");
    await queryInterface.removeColumn("treino_exercicio", "numerodeRepeticoes");
  },
};
