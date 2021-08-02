const Subcategory = require("../model/subCategory.model");
const slugify = require("slugify");

exports.createSubCategory = async (req, res, next) => {
  const subcategory = new Subcategory({
    name: req.body.name,
    slug: slugify(req.body.name),
    parent: req.body.parent,
  });

  try {
    const newCategory = await subcategory.save();
    res.status(201).json({
      message: "new sub-category created",
      newCategory: newCategory,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "create category failed" });
  }
};

exports.getListSubCategory = async (req, res, next) => {
  try {
    await Subcategory.find({})
      .sort({ createdAt: -1 })
      .exec((err, result) => {
        if (!result) {
          res.status(400).send("category not found");
        }
        res.status(200).json({ categorys: result });
      });
  } catch (error) {
    cl;
    res.status(400).send("get category failed");
  }
};

exports.getSingleSubCategory = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    category = await Subcategory.findOne({ slug: slug });
    res.status(200).json({ category });
  } catch (error) {
    res.status(400).send("get single category failed");
  }
};

exports.deleteSubCategory = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    await Subcategory.deleteOne({ slug: slug });
    res.status(200).json({ message: "sub-category deleted successfully" });
  } catch (error) {
    res.status(400).json({ error: "Delete category failed" });
  }
};

exports.updateSubCategory = async (req, res, next) => {
  const slug = req.params.slug;

  try {
    await Subcategory.findOne({ slug: slug }, (err, category) => {
      if (!category) {
        res.status(404).send("category not found");
      } else {
        category.name = req.body.name;
        category.slug = slugify(req.body.name);
        category.parent = req.body.parent;

        category
          .save()
          .then((updatedCategory) => {
            res.status(200).json({
              message: "sub category successfully updated",
              updatedCategory,
            });
          })
          .catch((err) => {
            res.status(400).json({ error: "unable to update sub category" });
          });
      }
    });
  } catch (error) {
    res.status(400).json({ error: "unable to update sub category" });
  }
};
