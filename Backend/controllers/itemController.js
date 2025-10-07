const Item = require("../models/Item");

exports.createItem = async (req, res) => {
  try {
    const { title, description, category, condition, price, isDonation, rollNo, block } = req.body;
    const imagePath = req.file ? req.file.path : null; // Save image path if uploaded

    const item = new Item({
      title,
      description,
      category,
      condition,
      price,
      isDonation,
      rollNo,
      block,
      image: imagePath, // Store in DB
    });

    await item.save();

    res.status(201).json({ message: "Item created successfully", item });
  } catch (err) {
    res.status(500).json({ message: "Error creating item", error: err.message });
  }
};
