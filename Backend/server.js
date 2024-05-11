// requiring dependencies from package.json
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');

// express assignd to app variable
const app = express();

// using cors and body parser middlewares
app.use(cors());
app.use(bodyParser.json());

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
