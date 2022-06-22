function postPhotoProduct(req, res) {
  try {
    res.status(200).json({
      path: req.file.path,
    });
  } catch (error) {
    res.json({
      message: error,
    });
  }
}

module.exports = postPhotoProduct;
