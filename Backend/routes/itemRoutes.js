const express = require("express");
const router = express.Router();
const { createItem } = require("../controllers/itemController");
const multer = require("multer");
const path = require("path");

// Set storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // Folder to save images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  },
});

const upload = multer({ storage });

// POST item with image
router.post("/", upload.single("image"), createItem);

module.exports = router;
