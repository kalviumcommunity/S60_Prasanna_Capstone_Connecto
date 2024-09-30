const express = require('express');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('./models/User'); // Import User model
const ModelDb = require('./models/ModelDb'); // Import Main model
const Joi = require('joi');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

const router = express.Router();

const userJoiSchema = Joi.object({
  name: Joi.string().alphanum().min(2).max(40).required(),
  email: Joi.string().email().required(),
  confirmemail: Joi.string().email().required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
  confirmpassword: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{5,40}$')).required(),
  gender: Joi.string().required(),
});

// GET route to check if the backend is working
router.get('/', (req, res) => {
  try {
    res.send('backend is working');
  } catch (err) {
    console.log('some error in backend');
  }
});

// GET route to fetch data from ModelDb
router.get('/main', async (req, res) => {
  try {
    const data = await ModelDb.find({});
    res.json(data);
  } catch (err) {
    res.status(500).send(err);
  }
});

// POST route for signup
router.post('/signup', async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  if (user) {
    res.status(400).send({ message: 'User already exists' });
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

      return res.status(201).send({ message: 'User registered successfully' });
    } catch (error) {
      console.log('error', error);
      return res.status(500).send({ message: 'Server error' });
    }
  }
});

// POST route for login
router.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (user && bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).send({ message: 'Invalid credentials' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error during login');
  }
});

// POST route for Google login
router.post('/google-login', async (req, res) => {
  const { token } = req.body;

  if (!token) {
    return res.status(400).json({ message: 'No token provided' });
  }

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name, sub: googleId } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(googleId + process.env.PASSWORD_SALT, salt);
      user = new User({ name, email, password: hashedPassword, googleId });
      await user.save();
    }

    res.json({ message: 'Login successful', userId: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error('Error during Google login:', error);

    if (error.message.includes('Token used too late')) {
      res.status(400).json({ message: 'Token expired. Please try logging in again.' });
    } else if (error.message.includes('Invalid token')) {
      res.status(400).json({ message: 'Invalid token. Please try logging in again.' });
    } else {
      res.status(500).json({ message: 'Server error during authentication' });
    }
  }
});

// POST route for creating new data
router.post('/main', async (req, res) => {
  try {
    const newData = await ModelDb.create(req.body);
    res.status(201).send(newData);
  } catch (error) {
    res.status(500).send({ message: 'Error creating data' });
  }
});

// DELETE route for removing data by ID
router.delete('/store/:id', async (req, res) => {
  try {
    const deleted = await ModelDb.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.send('Deleted successfully');
    } else {
      res.status(404).send({ message: 'Data not found' });
    }
  } catch (error) {
    res.status(500).send({ message: 'Error deleting data' });
  }
});

module.exports = router;
