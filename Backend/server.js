const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const connectDB = require('./db'); // Your DB connection function
const routes = require('./routes'); // Importing routes

const app = express();
app.use(bodyParser.json());

// Define CORS options
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://66f7d29867e03e9f105116a5--brilliant-alpaca-9a29eb.netlify.app',
    'https://brilliant-alpaca-9a29eb.netlify.app',
  ],
  methods: ['GET', 'POST', 'DELETE', 'PUT', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

app.use(cors(corsOptions));

// Use routes from routes.js
app.use('/', routes);

const PORT = process.env.PORT || 5335;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server listening on port ${PORT}`);
});
