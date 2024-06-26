const express = require("express");
const {
  getProducts,
  getProductById,
  searchProduct,
  filterProductByCategory,
  filterProductByPrice,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");
const { auth, admin } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/api/products", getProducts);                                   // GET /api/products - Get all products
router.get("/api/products/:id", getProductById);                             // GET /api/products/:id - Get product by ID
router.get("/api/products/search", searchProduct);                           // GET /api/products/search - Search product by name
router.get("/api/products/filter/category/:category", filterProductByCategory); // GET /api/products/filter/category/:category - Filter products by category
router.get("/api/products/filter/price", filterProductByPrice);              // GET /api/products/filter/price - Filter products by price range
router.post("/api/products", auth, admin, createProduct);                    // POST /api/products - Create a new product (Admin only)
router.put("/api/products/:id", auth, admin, updateProduct);                 // PUT /api/products/:id - Update a product (Admin only)
router.delete("/api/products/:id", auth, admin, deleteProduct);              // DELETE /api/products/:id - Delete a product (Admin only)

module.exports = router;
