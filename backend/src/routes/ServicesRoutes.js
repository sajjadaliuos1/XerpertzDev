const express = require("express");
const path = require("path"); // Required for image path handling
const ServicesModel = require("../models/Services"); // Renamed to avoid conflict
const upload = require("../middleware/upload");
const fs = require("fs");

const router = express.Router();

router.post("/addServices", upload.single("image"), async (req, res) => {
    try {
        console.log("Received File:", req.file); // Debugging

        if (!req.file) {
            return res.status(400).json({ error: "Please upload an image!" });
        }

        const { category, title, paragraph } = req.body;

        if (!category || !title || !paragraph) {
            return res.status(400).json({ error: "All fields are required!" });
        }

        // Create new service entry using correct model name
        const newService = new ServicesModel({
            category,
            title,
            paragraph,
            image: req.file.filename, 
        });

        await newService.save();
        res.status(201).json({ message: "Content added successfully!" });

    } catch (error) {
        console.error("Error adding content:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
