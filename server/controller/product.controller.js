const Product = require("../model/product.model");
const slugify = require("slugify");
const uuid = require("uuid");
const User = require("../model/user.model");

exports.createProduct = async (req, res, next) => {
  const product = new Product({
    title: req.body.title,
    slug: slugify(req.body.title),
    price: req.body.price,
    description: req.body.description,
    quantity: req.body.quantity,
    sold: req.body.sold,
    images: req.body.images,
    shipping: req.body.shipping,
    color: req.body.color,
    brand: req.body.brand,
    category: req.body.category,
    subCategory: req.body.subCategory,
    productId: uuid.v4(),
  });

  try {
    newProduct = await product.save();
    res
      .status(201)
      .json({ message: "New Product Created", newProduct: newProduct });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Product Not Created" });
  }
};

exports.getAllProducts = async (req, res, next) => {
  try {
    await Product.find({}, (err, product) => {
      if (err) return res.status(400).json({ error: "Cant find Products" });

      res.status(200).send({ products: product });
    });
  } catch (error) {
    res.status(400).json({ error: "Cant get Products" });
  }
};

exports.getProductById = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Product.findOne({ _id: id }, (err, product) => {
      if (err) return res.status(400).json({ error: "Cant find Products" });

      res.status(200).json({ singleProduct: product });
    });
  } catch (error) {
    res.status(400).json({ error: "Cant get this Product" });
  }
};

exports.deleteProduct = async (req, res, next) => {
  const id = req.params.id;

  try {
    await Product.deleteOne({ _id: id }, (err, product) => {
      if (!product)
        return res.status(400).json({ error: "Cant find Products" });

      res.status(203).json({ message: "Product Deleted" });
    });
  } catch (error) {
    res.status(400).json({ error: "Cant delete Product" });
  }
};

exports.updateProduct = async (req, res, next) => {
  const id = req.params.id;

  await Product.findOne({ _id: id }, (err, product) => {
    if (err) {
      res.status(400).json({ error: "No data Found" });
    } else {
      product.title = req.body.title;
      product.price = req.body.price;
      product.images = req.body.images;
      product.description = req.body.description;
      product.brand = req.body.brand;
      product.category = req.body.category;
      product.subCategory = req.body.subCategory;
      product.color = req.body.color;
      product.quantity = req.body.quantity;
      product.sold = req.body.sold;

      product
        .save()
        .then((myData) => {
          res.status(200).json({ message: "product updated successfully" });
        })
        .catch((err) => {
          res.status(400).json({ error: "unable to update" });
        });
    }
  });
};

exports.createProductReview = async (req, res, next) => {
  const { rating, comment } = req.body;
  const id = req.params.id;
  const product = await Product.find({ _id: id });

  if (product) {
    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment: comment,
      user: req.user._id,
    };

    res.status(200).json({ message: "Review added successfully" });
  } else {
    res.status(400).send("unable to add review");
  }
};

//without pagination
// exports.productList = async (req, res, next) => {
//   try {
//     const { sort, order, limit } = req.body;

//     const products = await Product.find({})
//       .populate("category")
//       .populate("subCategory")
//       .sort([[sort, order]])
//       .limit(limit)
//       .exec();

//     res.status(200).json({ productsList: products });
//   } catch (error) {
//     console.log(error);
//     res.status(400).json({ error: "Product List Failed" });
//   }
// };

//with pagination
exports.productList = async (req, res, next) => {
  try {
    const { sort, order, page } = req.body;

    const currentPage = page || 1;

    const perPage = 5;

    const products = await Product.find({})
      .skip((currentPage - 1) * perPage)
      .populate("category")
      .populate("subCategory")
      .sort([[sort, order]])
      .limit(perPage)
      .exec();

    res.status(200).json({ productsList: products });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Product List Failed" });
  }
};

exports.productsCount = async (req, res, next) => {
  let total = await Product.find({}).estimatedDocumentCount().exec();
  res.status(200).json({ total: total });
};

exports.productStar = async (req, res, next) => {
  const id = req.params.productId;
  const product = await Product.findOne({ _id: id }).exec();
  const user = await User.findOne({ email: req.user.email }).exec();
  const { star } = req.body;

  let existingRating = product.ratings.find(
    (ele) => ele.postedBy.toString() === user._id.toString()
  );

  if (existingRating === undefined) {
    let ratingAdded = await Product.findByIdAndUpdate(
      product._id,
      {
        $push: { ratings: { star, postedBy: user._id } },
      },
      { new: true }
    ).exec();
    res.status(200).json(ratingAdded);
  } else {
    const ratingUpdated = await Product.updateOne(
      {
        ratings: { $elemMatch: existingRating },
      },
      { $set: { "ratings.$.star": star } },
      { new: true }
    ).exec();

    res.status(200).json({ ratingUpdated });
  }
};

exports.relatedProducts = async (req, res, next) => {
  const id = req.params.id;

  const product = await Product.findOne({ _id: id }).exec();

  const relatedProducts = await Product.find({
    _id: { $ne: product._id },
    category: product.category,
  })
    .limit(5)
    .populate("category")
    .populate("subCategory")
    .populate("postedBy")
    .exec();

  res.status(200).json({ relatedProducts: relatedProducts });
};

const handleQuery = async (req, res, query) => {
  const searchProducts = await Product.find({ $text: { $search: query } })
    .populate("category", "_id name")
    .populate("subCategory", "_id name")
    .populate("postedBy", "_id , name")
    .exec();

  res.status(200).json({ searchProducts: searchProducts });
};

const handlePrice = async (req, res, price) => {
  try {
    let priceFilter = await Product.find({
      price: {
        $gte: price[0],
        $lte: price[1],
      },
    })
      .populate("category", "_id name")
      .populate("subCategory", "_id name")
      .populate("postedBy", "_id , name")
      .exec();

    res.status(200).json({ priceFilter: priceFilter });
  } catch (error) {
    console.log(error);
  }
};

//search Filters
exports.searchFilters = async (req, res, next) => {
  const query = req.body.query;
  const price = req.body.price;

  if (query) {
    console.log(query);
    await handleQuery(req, res, query);
  }

  if (price !== undefined) {
    console.log(price);
    await handlePrice(req, res, price);
  }
};
