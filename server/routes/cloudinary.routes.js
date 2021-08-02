const express = require("express");
const clodinaryRouter = express.Router();
const { upload, remove } = require("../controller/cloudinary.controller");

clodinaryRouter.route("/upload").post(upload);
clodinaryRouter.route("/remove").post(remove);

module.exports = clodinaryRouter;
