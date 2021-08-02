const cloudinary = require("cloudinary");

//config
cloudinary.config({
  cloud_name: "dcutqjov4",
  api_key: "315447929344578",
  api_secret: "UkFT6DbM4SwWarGxPuJ0lNS7au8",
});

exports.upload = async (req, res, next) => {
  let result = await cloudinary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`,
    resource_type: "auto",
  });

  res.status(200).json({ public_id: result.public_id, url: result.secure_url });
};

exports.remove = (req, res, next) => {
  let image_id = req.body.public_id;

  cloudinary.uploader.destroy(image_id, (err, result) => {
    res.status(200).json({ message: "Image Deleted" });
  });
};
