const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const errorHandler = require('./middlewares/errorHandler'); // Error handler middleware
const routes = require('./routes'); // Import the routes

const MONGO_URI = process.env.MONGO_URI;

const app = express();
app.use(bodyParser.json());

const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://brilliant-alpaca-9a29eb.netlify.app',
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Connect to the database
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to DB');
  } catch (error) {
    console.log(error, 'Error connecting to DB');
  }
};

// Use the routes
app.use('/', routes);

// Use the error handler middleware
app.use(errorHandler);

const PORT = process.env.PORT || 5335;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening on port ${PORT}`);
});
