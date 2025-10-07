const express = require("express");
const router = express.Router();
const { createOrder, getOrders } = require("../controllers/orderController");

// POST /api/orders/buy
router.post("/buy", createOrder);

// GET /api/orders
router.get("/", getOrders);

module.exports = router;
