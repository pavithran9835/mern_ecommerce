const Category = require("../model/category.model");
const Subcategory = require("../model/subCategory.model");
const slugify = require("slugify");
const subcategoryModel = require("../model/subCategory.model");
const Product = require("../model/product.model");

exports.createCategory = async (req, res, next) => {
  const category = new Category({
    name: req.body.name,
    slug: slugify(req.body.name),
  });

  try {
    const newCategory = await category.save();
    res.status(201).json({
      message: "new category created",
      newCategory: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "create category failed" });
  }
};

exports.getListCategory = async (req, res, next) => {
  try {
    let result = await Category.find({}).sort({ createdAt: -1 }).exec();
    if (!result) {
      res.status(400).send("category not found");
    }
    res.status(200).json({ categorys: result });
  } catch (error) {
    res.status(400).send("get category failed");
  }
};

exports.getSingleCategory = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    category = await Category.findOne({ slug: slug });

    let product = await Product.find({ category }).populate("category").exec();

    res.status(200).json({ category, productCategory: product });
  } catch (error) {
    res.status(400).send("get single category failed");
  }
};

exports.deleteCategory = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    await Category.deleteOne({ slug: slug });
    res.status(200).json({ message: "category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Delete category failed" });
  }
};

exports.updateCategory = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    await Category.findOne({ slug: slug }, (err, category) => {
      if (!category) {
        res.status(404).send("category not found");
      } else {
        category.name = req.body.name;
        category.slug = slugify(req.body.name);

        category
          .save()
          .then((updatedCategory) => {
            res.status(200).json({
              message: "category successfully updated",
              updatedCategory,
            });
          })
          .catch((err) => {
            res.status(400).json({ error: "unable to update" });
          });
      }
    });
  } catch (error) {
    res.status(400).send("category update failed");
  }
};

exports.getChildCategory = async (req, res, next) => {
  const id = req.params.id;

  try {
    childCategory = await Subcategory.find({ parent: id });
    res.status(200).json({ childCategory: childCategory });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to get Child category" });
  }
};

exports.getCategoryName = async (req, res) => {
  const id = req.params.id;

  try {
    const categoryDetails = await Category.findOne({ _id: id });
    if (!categoryDetails)
      return res.status(400).json({ error: "Cant find category" });
    res.status(200).json({ categoryDetails: categoryDetails });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to get category" });
  }
};

exports.getSubCategoryName = async (req, res) => {
  const id = req.params.id;

  try {
    const subCategoryDetails = await Subcategory.findOne({ _id: id });
    if (!subCategoryDetails)
      return res.status(400).json({ error: "Cant find category" });
    res.status(200).json({ subCategoryDetails: subCategoryDetails });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Unable to get category" });
  }
};
