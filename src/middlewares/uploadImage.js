const createHttpError = require('http-errors');

const uploadImage = async (req, _res, next) => {
  try {
    // Get the file that was set to our field named "image"
    const { image } = req.files;

    // If no image submitted, exit
    if (!image) throw createHttpError[422]("No image was sent");

    // If does not have image mime type prevent from uploading
    if (/^image/.test(image.mimetype)) throw createHttpError[415]("Unsupported image file");

    // Set image upload directory
    const imageDir = __dirname + '/upload/' + image.name;

    // Move the uploaded image to our upload folder
    image.mv(imageDir);

    // Add the image url to the request body
    req.body.image = imageDir;

    // All good
    next();
  } catch(error) {
    next(error);
  }
};

module.exports = uploadImage;