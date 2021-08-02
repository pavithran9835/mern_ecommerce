const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;
const orderSchema = new mongoose.Schema(
  {
    products: [
      {
        product: {
          type: ObjectId,
          ref: "Product",
        },
        color: "String",
        count: "Number",
      },
    ],
    paymentIntent: {},
    orderStatus: {
      type: "String",
      default: "processing",
      enum: [
        "Not Processed",
        "processing",
        "Dispatched",
        "Completed",
        "Cancelled",
      ],
    },
    orderedBy: { type: ObjectId, ref: "User" },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Order", orderSchema);
