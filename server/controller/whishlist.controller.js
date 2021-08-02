const User = require("../model/user.model");

exports.createWhishlist = async (req, res, next) => {
  const { productId } = req.body;

  const user = await User.findOneAndUpdate(
    { email: req.user.email },
    { $addToSet: { whishlist: productId } },
    { new: true }
  ).exec();

  res.status(200).json({ message: "Whislist Added", user });
};
