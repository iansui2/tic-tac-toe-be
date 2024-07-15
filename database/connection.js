const mongoose = require('mongoose'); // Import Mongoose for MongoDB interaction

// Connect to the MongoDB database using the connection string from environment variables
mongoose.connect(process.env.DATABASE_CONNECTION, 
{ 
  useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
  useUnifiedTopology: true, // Use the new Server Discover and Monitoring engine
});

// Get the connection object
const database = mongoose.connection;

// Listen for connection errors and log them to the console
database.on("error", console.error.bind(console, "Connection Error: "));

// Once the connection is open, log a success message to the console
database.once("open", function() {
  console.log("Connected to the database successfully!");
});

// Export the database connection for use in other modules
module.exports = database;