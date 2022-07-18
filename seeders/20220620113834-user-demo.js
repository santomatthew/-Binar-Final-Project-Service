"use strict";

const encryptPassword = require("../controller/encrypt-decrypt/encrypt");

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
    await queryInterface.bulkInsert("users", [
      {
        name: "Santo",
        email: "santo@gmail.com",
        password: await encryptPassword("12345678"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Siti",
        email: "siti@gmail.com",
        password: await encryptPassword("12345678"),
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Kartika",
        email: "kartika@gmail.com",
        password: await encryptPassword("12345678"),
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
    await queryInterface.bulkDelete("users", {
      email: "santo@gmail.com",
    });
  },
};
