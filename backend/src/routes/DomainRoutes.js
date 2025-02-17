const express = require("express");
const Domain = require('../models/Domain'); // Ensure correct import
const router = express.Router();

// Add Domain API
router.post("/addDomain", async (req, res) => {
    try {
        let { category, title, features } = req.body;

        // Parse features if it's a stringified JSON array
        if (typeof features === 'string') {
            try {
                features = JSON.parse(features); // Parse the stringified array
            } catch (error) {
                return res.status(400).json({ error: "Features should be a valid JSON array!" });
            }
        }

        // Validate required fields and ensure features is an array
        if (!category || !title || !features || !Array.isArray(features)) {
            return res.status(400).json({ error: "All fields (category, title, features) are required and features must be an array!" });
        }

        // Create new domain object
        const domain = new Domain({
            category,
            title,
            features,
        });

        // Save domain to the database
        await domain.save();

        // Send success response
        res.status(201).json({ message: "Domain added successfully!" });

    } catch (error) {
        console.error("Error adding domain:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});



  

// Update Domain API
router.put("/updateDomain/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { title, feature, category } = req.body;

    if (!title || !feature || !category) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const updateData = { title, feature, category };

    const updatedDomain = await Domain.findByIdAndUpdate(id, updateData, { new: true });

    if (!updatedDomain) {
      return res.status(404).json({ error: "Domain not found" });
    }

    res.json({ message: "Domain updated successfully", domain: updatedDomain });
  } catch (error) {
    console.error("Error updating domain:", error);
    res.status(500).json({ error: "Failed to update domain" });
  }
});

module.exports = router;
