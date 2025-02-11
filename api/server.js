require("dotenv").config();
const express = require("express");
// import Features from './../app/src/pages/admin-view/features';
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const adminOrderRouter = require("./routes/admin/order-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const FeaturesProductsRouter = require("./routes/common/feature-routes");
const SearchProductsRouter = require("./routes/shop/search-routes");
const AddressProductsRouter = require("./routes/shop/address-routes");
const CartProductsRouter = require("./routes/shop/cart-routes");
const shopReviewRouter = require("./routes/shop/review-routes");
const shopOrderRouter = require("./routes/shop/order-routes");
const stripeRoutes = require("./routes/stripe/stripe");

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
const app = express();
const PORT = process.env.PORT || 5000;
console.log("url-from-server", process.env.URL);
app.use(
  cors({
    origin: process.env.URL,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",
    ],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.get("/", (req, res) => {
  res.send("Backend is running!");
});
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/common/feature", FeaturesProductsRouter);
app.use("/api/shop/search", SearchProductsRouter);
app.use("/api/shop/address", AddressProductsRouter);
app.use("/api/shop/cart", CartProductsRouter);
app.use("/api/shop/review", shopReviewRouter);
app.use("/api/shop/order", shopOrderRouter);
app.use("/api/stripe", stripeRoutes);
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
