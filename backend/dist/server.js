"use strict";

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var api = require('./api');
var connectDB = require('./db'); // Ensure to import your DB connection

var app = express();
var PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json()); // For parsing application/json

// Connect to MongoDB
connectDB().then(function () {
  console.log("Connected to MongoDB");

  // Use the API routes before the catch-all
  app.use('/api', api); // Prefix API routes

  // Serve static files
  app.use(express["static"](path.resolve(__dirname, '../../frontend/public'))); // Adjusted path

  // Serve the index.html file for the root route
  app.get('/', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../frontend/public/index.html')); // Adjusted path
  });

  // Catch-all route to serve index.html for client-side routing
  app.get('*', function (req, res) {
    res.sendFile(path.resolve(__dirname, '../../frontend/public/index.html')); // Adjusted path
  });

  // Start the server
  app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
  });
})["catch"](function (err) {
  console.error("Could not connect to MongoDB:", err);
});