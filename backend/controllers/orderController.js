const Order = require("../models/orderModel");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { products, totalAmount } = req.body;
    const newOrder = new Order({
      user: req.user.id,
      products,
      totalAmount,
      createdAt,
    });
    await newOrder.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all orders for the logged-in user
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user.id }).populate(
      "products.productId"
    );
    res.json(orders);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a specific order by ID
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate(
      "products.productId"
    );
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.json(order);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
