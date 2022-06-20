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
    await queryInterface.bulkInsert("categories", [
      {
        name: "Hobi",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kendaraan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Baju",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Elektronik",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kesehatan",
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
  },
};
