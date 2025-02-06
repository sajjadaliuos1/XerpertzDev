const cors = require('cors');
const express = require('express');
require('./src/db/config'); // Ensure DB is connected
const app = express();
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
// Enable CORS for all origins or specify allowed domains
app.use(cors({
  origin: 'http://localhost:5173', // Change this to the exact frontend origin if needed
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json()); // Body parser for JSON requests
app.use('/api', require('./src/routes/home'));  // Use home routes

app.listen(5000, () => {
  console.log("API is running on port 5000");
});
