const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const authRouter = require("./routes/auth.routes");
const productRouter = require("./routes/product.routes");
const userRouter = require("./routes/user.routes");
const orderRouter = require("./routes/order.routes");
const categoryRouter = require("./routes/category.routes");
const subCategoryRouter = require("./routes/subCategory.routes");
const clodinaryRouter = require("./routes/cloudinary.routes");
const cartRouter = require("./routes/cart.routes");
const couponRouter = require("./routes/coupon.routes");
const paymentRouter = require("./routes/payment.routes");
const whishlistRouter = require("./routes/whishlist.routes");
dotenv.config();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

//mongoDB
mongoose
  .connect(process.env.config_db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(
    (res) => {
      console.log("mongodb connected");
    },
    (err) => {
      console.log(err);
    }
  );

//routes
app.use("/payment", paymentRouter);
app.use("/coupon", couponRouter);
app.use("/user", authRouter);
app.use("/cart", cartRouter);
app.use("/product", productRouter);
app.use("/profile", userRouter);
app.use("/order", orderRouter);
app.use("/category", categoryRouter);
app.use("/subCategory", subCategoryRouter);
app.use("/cloudinary", clodinaryRouter);
app.use("/whishlist", whishlistRouter);

//listen
app.listen(PORT, () => {
  console.log("server listening on port 5000");
});
