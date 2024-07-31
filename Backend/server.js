// requiring dependencies from package.json. Refer package.json
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const MONGO_URI = process.env.MONGO_URI;

// express assignd to app variable
const app = express();

// using cors and body parser middlewares
app.use(cors());
app.use(bodyParser.json());

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('connected to DB');
  } catch (error) {
    console.log(error, 'error in connecting');
  }
};

// Mongodb-mongoose schema that is used to create a entity in the mainpage.
const MainSchema = new mongoose.Schema({
  Name: String,
  Profile: String,
  Work: String,
  PhoneNumber: Number,
  Email: String,
  WorkExp: String,
  Location: String,
  ExpectedSalary: String,
});

const ModelDb = mongoose.model('db', MainSchema);

// defining a "GET" route called main
app.get('/main', (req, res) => {
  ModelDb.find({}) //find function is used to fetch details from the database.
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});

// defining a "POST" route
app.post('/main', async (req, res) => {
  console.log(req.body, '____');
  await ModelDb.create(req.body);
  return res.send(req.body);
});

const PORT = 5335;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Port listening to ${PORT} port`);
});
