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
        name: "https://i.pinimg.com/564x/a5/3b/a8/a53ba807b263504c5ed857dfc9d1dde0.jpg",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/564x/1e/ae/85/1eae85bc7cc6e9bd6f417c442c7262f0.jpg",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/564x/e4/09/b6/e409b6226b8abb6196707862339e75a4.jpg",
        product_id: 1,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/07/c8/eb/07c8ebb8a1a00abd630e3952d562bd67.jpg",
        product_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/aa/70/b9/aa70b9400c9f836558adf58397f2fcab.jpg",
        product_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/474x/9a/cc/ce/9accce605e6105d3aabaa8300d38249d.jpg",
        product_id: 2,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/564x/5b/f3/9d/5bf39d710ea9bd074847bcfaf854f8c3.jpg",
        product_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/3d/1e/30/3d1e306f5e64f37f737e786ab859413c.jpg",
        product_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/6f/84/7c/6f847ccad6b2a8a00c8f921707144dd5.jpg",
        product_id: 3,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://3.bp.blogspot.com/-vnSbSsdjg1Y/WF-w_zUM2eI/AAAAAAAAAt4/us08cUGO2_EeyleYJvXGQJ0MWF2m78iVQCLcB/s1600/KARTU%2BTOL.jpg",
        product_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://fruitylogic.com/images/portofolio/5911e-money-card-card-e-toll-%20infinity-financial-services.webp",
        product_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdTBTWfdeY14uwCFvd4AcS_GtkeTkZS4m0qw&usqp=CAU",
        product_id: 4,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/56/1c/6f/561c6f685a49f032bd9bfda6f7dd69d6.jpg",
        product_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/dd/a9/09/dda909d4796d0aaf110bf7de5739499b.jpg",
        product_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/ce/a2/49/cea24953108704e99936cef6c73e3547.jpg",
        product_id: 5,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/cc/fd/54/ccfd54414dafd16c2682816f6d4c376c.jpg",
        product_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/236x/82/7b/0b/827b0b102be31d3e17052a854aab2a44.jpg",
        product_id: 6,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "https://i.pinimg.com/564x/6c/4d/f2/6c4df29d866033966ffaf483b35865f6.jpg",
        product_id: 6,
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
    await queryInterface.bulkDelete("photos", [
      {
        name: "https://www.ikea.co.id/in/produk/dekorasi/jam/degade-art-40490539",
      },
      {
        name: "https://www.ikea.co.id/in/produk/dekorasi/jam/dekad-art-50391906",
      },
      {
        name: "https://www.tokopedia.com/bijaksa-1/new-jam-beker-besi-jam-weker-jam-alarm-jam-beker-besi-angka",
      },
      {
        name: "https://shopee.co.id/Jam-Tangan-Anak-Smartwatch-Imoo-Smartwatch-Imoo-Jam-Tangan-Imoo-i.148306386.6706601905",
      },
      {
        name: "https://shopee.co.id/IMOO-Y1-Watch-Phone-Smartwatch-i.16396297.2014407251",
      },
      {
        name: "https://www.blibli.com/p/imoo-z5-watch-phone-smartwatch-original/ps--GAD-60042-00064",
      },
    ]);
  },
};
