const express = require("express");
const {
  getCart,
  addToCart,
  removeFromCart,
} = require("../controllers/cartController");
const { auth } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/cart", auth, getCart);          // GET /api/cart - Get the user's cart
router.post("/api/cart", auth, addToCart);       // POST /api/cart - Add to cart
router.delete("/api/cart/:id", auth, removeFromCart); // DELETE /api/cart/:id - Delete cart item

module.exports = router;
