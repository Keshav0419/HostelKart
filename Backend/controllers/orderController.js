const Order = require("../models/Order");

// Create a new order
exports.createOrder = async (req, res) => {
  try {
    const { name, phone, block } = req.body;

    // Validation: only these 3 fields are required
    if (!name || !phone || !block) {
      return res.status(400).json({
        success: false,
        message: "Name, phone, and block are required"
      });
    }

    // Save order in DB
    const order = new Order({
      name,
      phone,
      block,
      createdAt: new Date()
    });

    await order.save();

    return res.status(201).json({
      success: true,
      message: "Order created successfully",
      order
    });

  } catch (err) {
    console.error("Order creation error:", err);
    return res.status(500).json({ success: false, message: "Server error" });
  }
};

// Get all orders
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("Get orders error:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
