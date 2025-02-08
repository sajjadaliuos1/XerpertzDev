const express = require('express');
const Home = require("../models/Home");
const upload = require('../middleware/upload');

const router = express.Router();

// Add Home Content
router.post("/addhome", upload.single('image'), async (req, res) => {
    try {
        const { category, title, paragraph, description } = req.body;

        if (!category || !title || !paragraph || !description || !req.file) {
            return res.status(400).json({ error: "All fields and an image are required!" });
        }

        const home = new Home({
            category,
            title,
            paragraph,
            description,
            image: req.file.path
        });

        await home.save();
        res.status(201).json({ message: "Content added successfully!" });
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
