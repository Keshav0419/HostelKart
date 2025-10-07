const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  condition: String,
  price: Number,
  isDonation: Boolean,
  rollNo: String,
  block: String,
  image: String, // added image field
}, { timestamps: true });

module.exports = mongoose.model("Item", itemSchema);
