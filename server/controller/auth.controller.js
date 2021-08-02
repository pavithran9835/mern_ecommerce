const User = require("../model/user.model");
const bcrypt = require("bcryptjs");
const Joi = require("joi");
const jwt = require("jsonwebtoken");

//register validation
const registerSchemaValidation = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(4).max(15).required(),
});

//login validation
const loginSchemaValidation = Joi.object({
  email: Joi.string().required(),
  password: Joi.string().min(4).max(12).required(),
});

//register Controller
exports.register = async (req, res) => {
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
  });

  try {
    await user.save();
    res.status(201).json({ message: "New User Created" });
  } catch (error) {
    res.status(400).json({ error: "Cannot register try after somer time" });
  }
};

//login Controller
exports.login = async (req, res) => {
  const { error } = loginSchemaValidation.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).json({ error: "Email Doesnt Exist" });

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid Password" });

  const accessToken = jwt.sign(
    { id: user._id, name: user.name },
    process.env.JWT_ACCESS_TOKEN,
    {
      expiresIn: "7d",
    }
  );

  const { _id, name, email, isAdmin } = user;

  res
    .status(200)
    .json({ token: accessToken, user: { _id, name, email, isAdmin } });
};

exports.deletereq = (req, res, next) => {
  res.send("Delete Function");
};
