const express = require('express');
const cors = require("cors");
require('./src/db/config'); // Ensure this file sets up the database connection
const userRoutes = require('./src/routes/user'); // Import user routes

const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
app.use(cors());

// Use user routes with '/api' prefix
app.use('/api', userRoutes);

app.listen(5000, () => {
  console.log("API is running on port 5000");
});
