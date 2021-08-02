const Coupon = require("../model/coupon.model");
const User = require("../model/user.model");
const Cart = require("../model/cart.model");

exports.createCoupon = async (req, res, next) => {
  const coupon = new Coupon({
    name: req.body.name,
    expiry: req.body.expiry,
    discount: req.body.discount,
  });

  try {
    const newCoupon = await coupon.save();
    res
      .status(201)
      .json({ newCoupon: newCoupon, message: "New Coupon Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cant create coupon" });
  }
};

exports.deleteCoupon = async (req, res, next) => {
  const _id = req.params.couponId;

  try {
    const deleteCoupon = await Coupon.deleteOne({ _id: _id });
    res.status(200).json({ message: "coupon deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "cannot delete coupon" });
  }
};

exports.listCoupon = async (req, res, next) => {
  try {
    await Coupon.find({}, (err, result) => {
      if (err) return res.status(400).json({ err });
      res.status(200).json({ listCoupon: result });
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.applyCoupon = async (req, res, next) => {
  const coupon = req.body.coupon;

  try {
    const validCoupon = await Coupon.findOne({ name: coupon });

    if (!validCoupon) return res.status(400).json({ error: "Invalid Coupon" });

    const user = await User.findOne({ email: req.user.email });

    let { products, cartTotal } = await Cart.findOne({ orderedBy: user._id });

    let totalAfterDiscount = (
      cartTotal -
      (cartTotal * validCoupon.discount) / 100
    ).toFixed(2);

    await Cart.findOneAndUpdate(
      { orderedBy: user._id },
      { totalAfterDiscount },
      { new: true }
    );

    res.status(200).json({
      message: "Coupon code applied successfully",
      totalAfterDiscount,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Invalid Coupon" });
  }
};
