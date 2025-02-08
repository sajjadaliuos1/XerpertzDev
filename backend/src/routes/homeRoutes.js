const express = require("express");
const Home = require("../models/Home");
const upload = require("../middleware/upload");

const router = express.Router();

// Add Home Content
router.post("/addhome", upload.single("image"), async (req, res) => {
  try {
    console.log("Received File:", req.file); // Debugging

    if (!req.file) {
      return res.status(400).json({ error: "Please upload an image!" });
    }

    // Process form data
    const { category, title, paragraph, description } = req.body;
    if (!category || !title || !paragraph || !description) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // Save to database
    const home = new Home({
      category,
      title,
      paragraph,
      description,
      image: `/assets/${req.file.filename}`,
    });

    await home.save();
    res.status(201).json({ message: "Content added successfully!" });
  } catch (error) {
    console.error("Error adding content:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
///////Home details///////////
// Ensure this is correctly imported

// Get all homepage data
router.get("/homedetails", async (req, res) => {
    try {
        const homepageData = await Home.find(); // Ensure the correct model name is used

        if (!homepageData.length) {
            return res.status(404).json({ message: "No data found" });
        }

        res.status(200).json(homepageData);
    } catch (error) {
        console.error("Error fetching homepage data:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
