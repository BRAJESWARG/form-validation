const express = require("express");
const mongoose = require("mongoose");

// Create an express app
const app = express();

// Use JSON middleware
app.use(express.json());

// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/users", {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Define the user schema using Mongoose
const userSchema = new mongoose.Schema({
  name: String,
  age: Number,
  sex: String,
  mobile: String,
  emergencyContact: String,
  idType: String,
  govtId: String,
  address: String,
  guardianName: String,
  guardianRelation: String,
  nationality: String
});

// Create a user model using Mongoose
const User = mongoose.model("User", userSchema);

// Define the POST route for creating a new user
app.post("/api/users", (req, res) => {
  // Get the user data from the request body
  const userData = req.body;

  // Create a new user instance using Mongoose
  const user = new User(userData);

  // Save the user to the database using Mongoose
  user.save((err, user) => {
    if (err) {
      // Handle the error
      res.status(500).json({ error: err.message });
    } else {
      // Send the user data as a response
      res.status(201).json({ user });
    }
  });
});

// Define the GET route for fetching all users
app.get("/api/users", (req, res) => {
  // Find all users from the database using Mongoose
  User.find({}, (err, users) => {
    if (err) {
      // Handle the error
      res.status(500).json({ error: err.message });
    } else {
      // Send the users data as a response
      res.status(200).json({ users });
    }
  });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});