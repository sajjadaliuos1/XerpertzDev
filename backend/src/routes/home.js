const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Home = require("../models/home");

// Storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      // Ensure the directory exists or specify a different location (e.g., public/assets/)
      cb(null, path.join(__dirname, 'assets')); // Using public/assets folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + path.extname(file.originalname)); // Using timestamp to avoid file name collision
    }
  });
  

// File filter
const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const isValid = allowedTypes.test(path.extname(file.originalname).toLowerCase()) && allowedTypes.test(file.mimetype);

    isValid ? cb(null, true) : cb(new Error('Only image files are allowed!'), false);
};

// Multer setup
const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: { fileSize: 50 * 1024 * 1024 } // Increase size limit to 50MB
  });

// API Route to handle file upload
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

        const result = await home.save();
        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
});

module.exports = router;
