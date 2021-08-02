const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema;

const productSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      text: true,
    },
    slug: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      text: true,
    },
    category: {
      type: ObjectId,
      ref: "Category",
    },
    subCategory: {
      type: ObjectId,
      ref: "Subcategory",
    },
    quantity: Number,
    sold: {
      type: Number,
      default: 0,
    },
    images: {
      type: Array,
    },
    shipping: {
      type: String,
      default: "Yes",
    },
    color: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    ratings: [
      {
        star: Number,
        postedBy: { type: ObjectId, ref: "User", required: true },
      },
    ],
    star: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    productId: {
      type: String,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Product", productSchema);
