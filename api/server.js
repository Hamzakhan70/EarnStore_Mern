const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser");
mongoose
  .connect("mongodb://127.0.0.1:27017/realtime-ecom-store")
  .then(() => console.log("MongoDB connected"))
  .catch((error) => console.log(error));
  const app = express();
const PORT = process.env.PORT || 5000;
app.use(
    cors({
        origin:"http://localhost:5173/",
        methods: ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders:["Content-Type",
      "Authorization",
      "Cache-Control",
      "Expires",
      "Pragma",],
      credentials:true
    })
)
app.use(cookieParser());
app.use(express.json());
app.listen(PORT, () => console.log(`Server is now running on port ${PORT}`));