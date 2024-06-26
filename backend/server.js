const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config(); // configure dotenv for environment variables

const authRoutes = require("./routes/authRoutes");
const productRoutes = require("./routes/productRoutes");
const cartRoutes = require("./routes/cartRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json()); // Middleware to parse JSON requests
app.use(cors()); // Middleware to enable CORS

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/orders", orderRoutes);

const PORT = process.env.PORT || 5000; // Define the port, defaulting to 5000 if not set in environment variables

mongoose
  .connect(process.env.MONGO_URI, {})
  .then(() => {
    // Start the server after successful connection to the database
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err);
  });
