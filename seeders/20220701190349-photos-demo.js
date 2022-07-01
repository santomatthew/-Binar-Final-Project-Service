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
    await queryInterface.bulkInsert("photos", [
      {
        name: "https://www.ikea.co.id/in/produk/dekorasi/jam/degade-art-40490539",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://www.ikea.co.id/in/produk/dekorasi/jam/dekad-art-50391906",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://www.tokopedia.com/bijaksa-1/new-jam-beker-besi-jam-weker-jam-alarm-jam-beker-besi-angka",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://shopee.co.id/Jam-Tangan-Anak-Smartwatch-Imoo-Smartwatch-Imoo-Jam-Tangan-Imoo-i.148306386.6706601905",
        product_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://shopee.co.id/IMOO-Y1-Watch-Phone-Smartwatch-i.16396297.2014407251",
        product_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://www.blibli.com/p/imoo-z5-watch-phone-smartwatch-original/ps--GAD-60042-00064",
        product_id: 2,
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
