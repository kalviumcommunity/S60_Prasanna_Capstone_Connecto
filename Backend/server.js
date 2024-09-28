const express = require('express');
const cors = require('cors');
const axios = require('axios');
const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const bodyParser = require('body-parser');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const MONGO_URI = process.env.MONGO_URI;
const { OAuth2Client } = require('google-auth-library');
const client = process.env.GOOGLE_CLIENT_ID;

const app = express();
app.use(bodyParser.json());
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'https://66f7b9361465ed8e7e106d54--benevolent-cocada-37ad35.netlify.app/',
  ],
  methods: 'GET,POST,DELETE,PUT',
  credentials: true,
};

app.use(cors(corsOptions));

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('connected to DB');
  } catch (error) {
    console.log(error, 'error in connecting');
  }
};

const userJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  confirmemail: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
  confirmpassword: Joi.string()
    .pattern(new RegExp('^[a-zA-Z0-9]{5,40}$'))
    .required(),
  gender: Joi.string().required(),
});

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

const userModelSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  gender: String,
  googleId: String,
});

const User = mongoose.model('AuthDB', userModelSchema);
const ModelDb = mongoose.model('db', MainSchema);

app.get('/main', (req, res) => {
  ModelDb.find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      res.send(err);
    });
});
app.get('/', (res, req) => {
  try {
    req.send('backend is working');
  } catch (err) {
    console.log('some error in backend');
  }
});
// app.post('/signup', async (req, res) => {
//   const user = await User.findOne({ email: req.body.email });
//   if (user) {
//     res.send({ message: 'get out' });
//   } else {
//     const { error, value } = userJoiSchema.validate(req.body);
//     if (error) {
//       return res.status(400).json({ message: error.details[0].message });
//     }
//     if (req.body.email !== req.body.confirmemail) {
//       return res.status(400).json({ message: 'Emails do not match' });
//     }
//     if (req.body.password !== req.body.confirmpassword) {
//       return res.status(400).json({ message: 'Passwords do not match' });
//     }
//     try {
//       const salt = await bcrypt.genSalt(10);
//       const hashedPassword = await bcrypt.hash(value.password, salt);
//       const newUser = await User.create({ ...value, password: hashedPassword });
//       res.send({ message: 'ok' });
//     } catch (error) {
//       console.log('error', error);
//     }
//   }
// });

app.post('/signup', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    res.status(400).send({ message: 'get out' }); 
  } else {
    const { error, value } = userJoiSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    if (req.body.email !== req.body.confirmemail) {
      return res.status(400).json({ message: 'Emails do not match' });
    }
    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(value.password, salt);
      const newUser = await User.create({ ...value, password: hashedPassword });
      return res.status(201).send({ message: 'ok' }); // Status 201 for successful creation
    } catch (error) {
      console.log('error', error);
      return res.status(500).send({ message: 'Server error' });
    }
  }
});

app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    if (user && bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.send({ message: 'Invalid credentials or user not existed' });
    }
  } catch (error) {
    console.log(error);
    res.send('Error in login');
  }
});

app.post('/google-login', async (req, res) => {
  const { token } = req.body;
  console.log('Received token:', token);

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { email, name, sub: googleId } = payload;
    let user = await User.findOne({ email });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(
        googleId + process.env.PASSWORD_SALT,
        salt
      );
      user = new User({
        name,
        email,
        password: hashedPassword,
        googleId,
      });
      await user.save();
    }
    res.json({
      message: 'Login successful',
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    console.error('Error during Google login:', error);

    if (error.message.includes('Token used too late')) {
      res
        .status(400)
        .json({ message: 'Token expired. Please try logging in again.' });
    } else if (error.message.includes('Invalid token')) {
      res
        .status(400)
        .json({ message: 'Invalid token. Please try logging in again.' });
    } else {
      res.status(500).json({ message: 'Server error during authentication' });
    }
  }
});

app.post('/main', async (req, res) => {
  console.log(
    req.body,
    '--------------------------------------------------------------'
  );
  await ModelDb.create(req.body);
  return res.send(req.body);
});

app.delete('/store/:id', async (req, res) => {
  try {
    const deleted = await ModelDb.findByIdAndDelete(req.params.id);
    console.log(deleted);
    res.send('deleted');
  } catch {
    (error) => {
      console.log(error);
    };
  }
});

const PORT = 5335;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Port listening to ${PORT} port`);
});
