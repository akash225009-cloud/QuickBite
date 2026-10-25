const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Food schema
const foodSchema = new mongoose.Schema({
  name: String,
  price: Number,
  category: String,
  description: String,
  image: String,
  available: {
    type: Boolean,
    default: true
  }
});

const Food = mongoose.model("Food", foodSchema);

// Test route
app.get("/", (req, res) => {
  res.send("QuickBite backend is running!");
});

// Add sample food items
app.post("/add-sample-foods", async (req, res) => {
  try {
    const count = await Food.countDocuments();

    if (count === 0) {
      await Food.insertMany([
        {
          name: "Chicken Burger",
          price: 149,
          category: "Burger",
          description: "Juicy chicken burger",
          image: "",
          available: true
        },
        {
          name: "Margherita Pizza",
          price: 249,
          category: "Pizza",
          description: "Classic cheese pizza",
          image: "",
          available: true
        },
        {
          name: "French Fries",
          price: 99,
          category: "Snacks",
          description: "Crispy golden fries",
          image: "",
          available: true
        },
        {
          name: "Chicken Biryani",
          price: 199,
          category: "Biryani",
          description: "Aromatic chicken biryani",
          image: "",
          available: true
        }
      ]);

      return res.json({
        message: "Sample food items added successfully!"
      });
    }

    res.json({
      message: "Food items already exist.",
      count
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to add food items.",
      error: error.message
    });
  }
});

// Get food items
app.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    res.json(foods);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("MongoDB connected successfully!");

    app.listen(process.env.PORT || 5000, () => {
      console.log("Server running on port 5000");
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error.message);
  });