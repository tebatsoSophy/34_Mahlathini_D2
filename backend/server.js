const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const api = require('./api');
const connectDB = require('./db'); // Ensure to import your DB connection

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Connect to MongoDB
connectDB().then(() => {
    console.log("Connected to MongoDB");

    // Use the API routes before the catch-all
    app.use('/api', api); // Prefix API routes

    // Serve static files
    app.use(express.static(path.resolve(__dirname, '../../frontend/public'))); // Adjusted path

    // Serve the index.html file for the root route
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/public/index.html')); // Adjusted path
    });

    // Catch-all route to serve index.html for client-side routing
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, '../../frontend/public/index.html')); // Adjusted path
    });

    // Start the server
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
    });
}).catch(err => {
    console.error("Could not connect to MongoDB:", err);
});
