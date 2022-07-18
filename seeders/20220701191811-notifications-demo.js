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
    await queryInterface.bulkInsert("notifications", [
      {
        user_id: 1,
        product_id: 1,
        title: "Berhasil diterbitkan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 1,
        product_id: 2,
        title: "Berhasil diterbitkan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        product_id: 3,
        title: "Berhasil diterbitkan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 2,
        product_id: 4,
        title: "Berhasil diterbitkan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        product_id: 5,
        title: "Berhasil diterbitkan",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        user_id: 3,
        product_id: 6,
        title: "Berhasil diterbitkan",
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
    await queryInterface.bulkDelete("notifcations", {
      user_id: 1,
    });
  },
};
