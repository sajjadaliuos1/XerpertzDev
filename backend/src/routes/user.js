const express = require('express');
const router = express.Router();
const User = require('../models/user'); // Ensure the correct model is imported
const bcrypt = require('bcryptjs');

// POST /api/register
router.post('/register', async (req, res) => {
  try {
      const { name, email, password } = req.body;

      if (!name || !email || !password) {
          return res.status(400).json({ error: "All fields are required." });
      }

      // Check if email already exists
      const existingUser = await User.findOne({ email });
      if (existingUser) {
          return res.status(400).json({ error: "This email is already registered. Please use another email." });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create new user
      const newUser = new User({ name, email, password: hashedPassword });
      await newUser.save();

      res.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
      console.error("Error in registration:", error);
      res.status(500).json({ error: "Internal server error" });
  }
});

// POST /api/login 
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required." });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ error: "No user found with this email." });
        }

        // Compare hashed password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Invalid email or password." });
        }

        // Remove password field before sending response
        const userWithoutPassword = { 
            _id: user._id, 
            name: user.name, 
            email: user.email 
        };

        res.status(200).json({ user: userWithoutPassword });

    } catch (error) {
        console.error("Login error:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
