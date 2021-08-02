const Order = require("../model/order.model");
const User = require("../model/user.model");
const Cart = require("../model/cart.model");

exports.createOrder = async (req, res, next) => {
  const { paymentIntent } = req.body.stripeResponse;

  const user = await User.findOne({ email: req.user.email }).exec();

  let { products } = await Cart.findOne({ orderedBy: user._id });

  const order = new Order({
    products: products,
    paymentIntent: paymentIntent,
    orderedBy: user._id,
  });

  try {
    const newOrder = await order.save();
    res.status(201).json({ message: "New Order Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

exports.getAllOrders = async (req, res, next) => {
  try {
    await Order.find({}, (err, orders) => {
      if (err) {
        res.status(400).json({ error: "No Order Found" });
      }
      res.status(200).json({ orders });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getOrderById = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Order.findOne({ _id: id }, (err, order) => {
      if (err) {
        res.status(400).json({ error: "No Order Found" });
      }
      res.status(200).json({ order });
    });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.getMyOrder = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.user.email }).exec();

    const myOrder = await Order.find({ orderedBy: user._id })
      .populate("products.product")
      .exec();

    if (!myOrder) return res.status(400).json({ error });
    res.status(200).json({ myOrder });
  } catch (error) {
    res.status(400).json({ error });
  }
};

exports.updateOrderToDelivered = async (req, res, next) => {
  const id = req.params.id;

  const order = await Order.findOne({ _id: id });

  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();

    const updateOrder = await order.save();

    res.status(200).json({ updateOrder });
  } else {
    res.status(400).json({ error: "No order Found" });
  }
};

exports.updateOrderToPaid = async (req, res, next) => {
  const id = req.params.id;

  const order = await Order.findOne({ _id: id });

  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      updateTime: req.body.updateTime,
      emailAddress: req.body.emailAddress,
    };

    const updateOrder = await order.save();
    res.status(200).json({ updateOrder });
  } else {
    res.status(400).json({ error: "No order Found" });
  }
};
