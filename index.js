require("dotenv").config(); // Load environment variables from .env file
const express = require('express'); // Import Express framework
const cors = require("cors"); // Import CORS middleware

const database = require('./database/connection'); // Import database connection
const gameRoutes = require('./controllers/GameController'); // Import game-related routes

const app = express(); // Create an instance of Express
const apiPortNumber = process.env.PORT || 8080; // Set the port number from environment variable or default to 8080

// CORS options configuration
const corsOptions = {
    origin: '*', // Allow requests from any origin
    credentials: true, // Allow credentials to be included in requests
    optionSuccessStatus: 200 // Set success status for older browsers
};

// Apply CORS middleware to the app
app.use(cors(corsOptions));
// Enable parsing of JSON request bodies
app.use(express.json({ extended: false }));

// Basic route to check if the server is running
app.get("/", (req, res) => {
    res.send('Server running on port: ' + apiPortNumber);
});

// Use game-related routes under the '/game' path
app.use('/game', gameRoutes);

// General error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack); // Log the error stack to the console
    res.status(500).send('Something broke!'); // Send an error response
});

// Start the server and listen on the specified port
app.listen(apiPortNumber, () => { 
    console.log('Server running on port: ' + apiPortNumber); // Log the running status
});