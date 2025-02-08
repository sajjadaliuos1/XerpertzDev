const express = require('express');
const cors = require('cors');
const connectDB = require('./src/db/config');
const path = require("path");
require('dotenv').config();
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: 'http://localhost:5173', methods: ['GET', 'POST', 'PUT', 'DELETE'] }));
app.use("/public", express.static(path.join(__dirname, "/public/assets")));
app.use('/api', require('./src/routes/userRoutes'));
app.use('/api', require('./src/routes/homeRoutes'));

app.listen(5000, () => {
    console.log("Server is running on port 5000");
});
