"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("products", [
      {
        name: "Jam Beker",
        price: 80000,
        category_id: 4,
        description: "Ini adalah jam Beker legenda",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Smartwatch",
        price: 3000000,
        category_id: 4,
        description: "Smartwatch merk imooo",
        user_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("products", [
      {
        name: "Jam Beker",
      },
      {
        name: "Smartwatch",
      },
    ]);
  },
};
