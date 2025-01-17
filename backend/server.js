const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = 8080;

app.use(cors());  // Allow all origins temporarily for debugging
app.use(express.json());

// MongoDB connection
console.log('Attempting to connect to MongoDB...');

// Set mongoose debug mode to see all queries
mongoose.set('debug', true);

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
})
.then(() => {
  console.log("MongoDB database connection established successfully");
  console.log("Connection URL:", process.env.MONGODB_URI.replace(/:[^:]*@/, ':****@')); // Hide password in logs
  console.log("Connection state:", mongoose.connection.readyState);
  
  // List all collections
  mongoose.connection.db.listCollections().toArray((err, collections) => {
    if (err) {
      console.error('Error listing collections:', err);
    } else {
      console.log('Available collections:', collections.map(c => c.name));
    }
  });
})
.catch((err) => {
  console.error("MongoDB connection error:", err);
  process.exit(1); // Exit if we can't connect to the database
});

mongoose.connection.on('error', err => {
  console.error('MongoDB connection error:', err);
});

mongoose.connection.on('connected', () => {
  console.log('Mongoose connected to MongoDB');
  console.log('Connection state:', mongoose.connection.readyState);
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose disconnected from MongoDB');
  console.log('Connection state:', mongoose.connection.readyState);
});

// Handle process termination
process.on('SIGINT', async () => {
  try {
    await mongoose.connection.close();
    console.log('MongoDB connection closed through app termination');
    process.exit(0);
  } catch (err) {
    console.error('Error closing MongoDB connection:', err);
    process.exit(1);
  }
});

// Routes
const usersRouter = require('./routes/users');
const locationsRouter = require('./routes/locations');

app.use('/api/users', usersRouter);
app.use('/api/locations', locationsRouter);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
