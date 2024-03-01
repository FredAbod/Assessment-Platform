// Importing required modules and packages
import express from "express"; // Express framework for building web applications
import dotenv from "dotenv"; // Dotenv for managing environment variables
import mongoose from "mongoose"; // Mongoose for MongoDB object modeling
import morgan from "morgan"; // Morgan for HTTP request logging

// Importing user routes
import userRoutes from './src/routes/user.Routes.js';

// Importing user routes
import subjectRoutes from "./src/routes/subject.Routes.js"

// Importing the connectDB function from the db configuration file
import { connectDB } from "./src/config/db.js";

// Initializing the Express application
const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

// Loading environment variables from .env file
dotenv.config();

// Middleware for HTTP request logging in development mode
app.use(morgan("dev"));

// Setting the port for the server to listen on
const port = process.env.PORT || 3000;

// Handling GET requests to the root route
app.get("/", (req, res) => {
  res.send("Welcome To Our Assessment Tutorial With Nodejs");
});

// Using user routes for endpoints starting with '/api/v1/user'
app.use('/api/v1/user', userRoutes);

// Using subjects routes for endpoints starting with '/api/v1/subjects'
app.use('/api/v1/subject', subjectRoutes);

// Handling 404 errors with a custom message
app.get("*", (req, res) => {
  res.status(404).json("page not found");
});

// Starting the server and connecting to the MongoDB database
app.listen(port, async () => {
  try {
    // Connecting to the MongoDB database using the connectDB function
    await connectDB(process.env.MONGODB_URL);
    console.log("Database connection established");
    console.log(`Server is listening on http://localhost:${port}`);
  } catch (error) {
    // Handling errors during database connection
    console.log("Error connecting to MongoDB: " + error.message);
  }
});
