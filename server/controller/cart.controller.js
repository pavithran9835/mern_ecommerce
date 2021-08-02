const Product = require("../model/product.model");
const User = require("../model/user.model");
const Cart = require("../model/cart.model");

exports.create = async (req, res, next) => {
  const cart = req.body.cart;

  const user = await User.findOne({ email: req.user.email });

  let products = [];

  //check cart with logged in user alredy exist
  let cartUserAlreadyExists = await Cart.findOne({
    orderedBy: user._id,
  }).exec();

  if (cartUserAlreadyExists) {
    cartUserAlreadyExists.remove();
    console.log("old cart removed");
  }

  for (let i = 0; i < cart.length; i++) {
    let object = {};

    object.product = cart[i]._id;
    object.count = cart[i].count;
    object.color = cart[i].color;

    //get price for createing total

    let { price } = await Product.findById(cart[i]._id).select("price").exec();
    object.price = price;

    products.push(object);
  }

  let cartTotal = 0;

  for (let i = 0; i < products.length; i++) {
    cartTotal = cartTotal + products[i].price * products[i].count;
  }

  let newCart = await new Cart({
    products,
    cartTotal,
    orderedBy: user._id,
  }).save();

  console.log(newCart);
  res.status(201).json({ newCart });
};

exports.getUserCart = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const userCart = await Cart.findOne({ orderedBy: user._id })
    .populate("products.product", "_id title price totalAfterDiscount")
    .exec();

  if (!userCart)
    return res.status(400).json({ error: "cart for this user doesnt exist" });

  const { products, cartTotal, totalAfterDiscount } = userCart;

  res.status(200).json({ products, cartTotal, totalAfterDiscount });
};

exports.emptyUserCart = async (req, res, next) => {
  const user = await User.findOne({ email: req.user.email }).exec();

  const userCart = await Cart.findOneAndRemove({ orderedBy: user._id });

  res.status(200).json({ message: "cart deleted" });
};
