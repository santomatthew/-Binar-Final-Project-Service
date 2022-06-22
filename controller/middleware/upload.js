const multer = require("multer");
const cloudinary = require("cloudinary").v2;

const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: "dxpjuvndd",
  api_key: "977811839227234",
  api_secret: "6_f_63DokkJ0NvOgefNiR8rUhxI",
});

const storageProduct = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "final-project/products",
    // format: async (req, file) => "png", // supports promises as well
    // public_id: (req, file) => "computed-filename-using-request",
  },
});

const storageUsers = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "final-project/users",
    // format: async (req, file) => "png", // supports promises as well
    // public_id: (req, file) => "computed-filename-using-request",
  },
});

const uploadPhotoProduct = multer({ storage: storageProduct });
const uploadPhotoUser = multer({ storage: storageUsers });

module.exports = {
  product: uploadPhotoProduct.single("file"),
  user: uploadPhotoUser.single("file"),
};
