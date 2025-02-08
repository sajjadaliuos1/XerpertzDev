const mongoose = require("mongoose");

const HomeSchema = new mongoose.Schema(
  {
    category: { type: String, required: true },
    title: { type: String, required: true },
    paragraph: { type: String },
    description: { type: String, },
    image: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Home", HomeSchema, "homepage"); // Explicitly set collection name
