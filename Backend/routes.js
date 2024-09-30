const express = require('express');
const bcrypt = require('bcryptjs');
const { OAuth2Client } = require('google-auth-library');
const User = require('./models/User'); // Import User model
const ModelDb = require('./models/ModelDb'); // Import Main model
const Joi = require('joi');
const validateInput = require('./helpers/validateInput'); // Import validation helper
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
  res.send('backend is working');
});

// GET route to fetch data from ModelDb
router.get('/main', async (req, res, next) => {
  try {
    const data = await ModelDb.find({});
    res.json(data);
  } catch (err) {
    next(err); // Passes error to error handler
  }
});

// POST route for signup
router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const validatedUser = validateInput(userJoiSchema, req.body); // Validate input using helper

    if (req.body.email !== req.body.confirmemail) {
      return res.status(400).json({ message: 'Emails do not match' });
    }

    if (req.body.password !== req.body.confirmpassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(validatedUser.password, salt);
    const newUser = await User.create({ ...validatedUser, password: hashedPassword });

    res.status(201).send({ message: 'User registered successfully' });
  } catch (error) {
    next(error); // Passes error to error handler
  }
});

// POST route for login
router.post('/login', async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (user && await bcrypt.compare(req.body.password, user.password)) {
      res.json({ message: 'Login successful' });
    } else {
      res.status(400).json({ message: 'Invalid credentials' });
    }
  } catch (error) {
    next(error); // Passes error to error handler
  }
});

// POST route for Google login
router.post('/google-login', async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) {
      return res.status(400).json({ message: 'No token provided' });
    }

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

    res.json({
      message: 'Login successful',
      userId: user._id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    next(error); // Passes error to error handler
  }
});

// POST route for creating new data
router.post('/main', async (req, res, next) => {
  try {
    const newData = await ModelDb.create(req.body);
    res.status(201).send(newData);
  } catch (error) {
    next(error); // Passes error to error handler
  }
});

// DELETE route for removing data by ID
router.delete('/store/:id', async (req, res, next) => {
  try {
    const deleted = await ModelDb.findByIdAndDelete(req.params.id);
    if (deleted) {
      res.send('Deleted successfully');
    } else {
      res.status(404).json({ message: 'Data not found' });
    }
  } catch (error) {
    next(error); // Passes error to error handler
  }
});

module.exports = router;
