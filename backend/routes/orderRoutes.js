const express = require("express");
const router = express.Router();
const { auth } = require("../middleware/authMiddleware");
const {
  createOrder,
  getOrders,
  getOrderById,
} = require("../controllers/orderController");

router.post("/api/orders", auth, createOrder);   // POST /api/orders - Create a new order
router.get("/api/orders", auth, getOrders);      // GET /api/orders - Get all orders for the logged-in user
router.get("/api/orders/:id", auth, getOrderById); // GET /api/orders/:id - Get a specific order by ID

module.exports = router;
