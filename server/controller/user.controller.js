const User = require("../model/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Joi = require("joi");

//register validation
const registerSchemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(15).required(),
  isAdmin: Joi.boolean(),
});

exports.createUserAdmin = async (req, res) => {
  const { error } = registerSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const emailExists = await User.findOne({ email: req.body.email });
  if (emailExists)
    return res.status(400).json({ error: "Email already exists" });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
    isAdmin: req.body.isAdmin,
  });

  try {
    await user.save();
    res.status(201).json({ message: "New User Created" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: "Cannot register try after some time" });
  }
};

exports.getUserProfile = async (req, res, next) => {
  try {
    await User.findOne({ _id: req.user._id }, (err, user) => {
      if (!user) {
        res.status(400).json({ error: "User not found" });
      } else {
        res.status(200).json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        });
      }
    });
  } catch (error) {
    res.status(400).json({ error: "cant get user profile" });
  }
};

exports.updateUserProfile = async (req, res, next) => {
  const user = await User.findOne({ _id: req.user._id });

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  if (user) {
    user.name = req.body.name || req.user.name;
    user.email = req.body.email || req.user.email;
    if (req.body.password) {
      user.password = hashedPassword || req.user.password;
    }
    const updatedUser = await user.save();
    res.status(200).json({
      message: "User Updated",
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: jwt.sign(
        { id: updatedUser._id, name: updatedUser.name },
        process.env.JWT_ACCESS_TOKEN,
        {
          expiresIn: "60min",
        }
      ),
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.getAllUser = async (req, res, next) => {
  try {
    await User.find({}, (err, users) => {
      if (!users) return res.status(404).json({ error: "users not found" });

      res.status(200).json({ message: "User", users: users });
    });
  } catch (error) {
    res.status(404).json({ error: "User not found" });
  }
};

exports.getUserById = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.find({ _id: id }, (err, user) => {
      if (!user) return res.status(400).json({ error: "users not found" });

      res.status(200).json({ singleUser: user });
    });
  } catch (error) {
    res.status(400).json({ error: "User not found" });
  }
};

exports.deleteUser = async (req, res, next) => {
  const id = req.params.id;

  try {
    await User.deleteOne({ _id: id }, (err, result) => {
      if (err) {
        res.status(400).json({ error: "Cant delete User" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    });
  } catch (error) {
    res.status(400).json({ error: "User not found" });
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;

  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(req.body.password, salt);

  const user = await User.findOne({ _id: id });

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.password = hashedPassword || user.password;
    user.isAdmin = req.body.isAdmin;

    const updatedUser = await user.save();
    res.status(200).json({
      message: "User Updated",
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(404).json({ error: "User not found" });
  }
};

exports.updateAddress = async (req, res, next) => {
  const userAddress = await User.findOneAndUpdate(
    { email: req.user.email },
    { address: req.body.address }
  ).exec();

  res.status(200).json({ message: "User Address Updated" });
};
