// requiring dependencies from package.json. Refer package.json
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');

// express assignd to app variable
const app = express();

// using cors and body parser middlewares
app.use(cors());
app.use(bodyParser.json());

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

// defining a "GET" route called main
app.get('/main', (req, res) => {
  then((res) => {
    res.send('get route');
  }).catch((error) => {
    res.status(500).send({ error: error.toString() });
  });
});

// defining a "POST" route
app.post('/main', async (req, res) => {
  then((res) => {
    return res.send(req.body);
  }).catch((error) => {
    console.log(error);
  });
});

app.listen(5335, async () => {
  console.log('Port listening to 5335 port');
});
