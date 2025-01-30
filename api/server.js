const express = require("express");
// import Features from './../app/src/pages/admin-view/features';
const mongoose = require("mongoose");
const cors = require("cors");

const cookieParser = require("cookie-parser");
const authRouter = require("./routes/auth/auth-routes");
const adminProductsRouter = require("./routes/admin/products-routes");
const shopProductsRouter = require("./routes/shop/products-routes");
const FeaturesProductsRouter = require("./routes/common/feature-routes");
const SearchProductsRouter = require("./routes/shop/search-routes");
mongoose
  .connect("mongodb://127.0.0.1:27017/realtime-ecom-store")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    origin: "http://localhost:5173",
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
app.use("/api/auth", authRouter);
app.use("/api/admin/products", adminProductsRouter);
// app.use("/api/admin/orders", adminOrderRouter);
app.use("/api/shop/products", shopProductsRouter);
app.use("/api/common/feature", FeaturesProductsRouter);
app.use("/api/shop/search", SearchProductsRouter);
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));
