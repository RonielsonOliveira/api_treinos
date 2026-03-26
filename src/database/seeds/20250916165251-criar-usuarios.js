const bcryptjs = require('bcryptjs');
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface) {
      await queryInterface.bulkInsert(
        'users',
        [{
          nome: 'Roniel',
          email: 'roni13@live.com',
          password_hash: await bcryptjs.hash('12345', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Roniel1',
          email: 'roni14@live.com',
          password_hash: await bcryptjs.hash('31232345', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          nome: 'Roniel1',
          email: 'roni15@live.com',
          password_hash: await bcryptjs.hash('1312312345', 8),
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
     {});

  },

  async down () {

  }
};
