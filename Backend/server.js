const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const itemRoutes = require("./routes/itemRoutes");
app.use("/api/items", itemRoutes);

const orderRoutes = require("./routes/orderRoutes");
app.use("/api/orders", orderRoutes);






// Root test route
app.get("/", (req, res) => {
  res.send("✅ HostelKart API is running");
});

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// Start server
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
