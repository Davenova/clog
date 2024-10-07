// api/saveUser.js
const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const router = express.Router();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define User Schema
const userSchema = new mongoose.Schema({
  username: String,
  userId: String,
});

const User = mongoose.model('User', userSchema);

// API Endpoint to save Telegram user data
router.post('/', async (req, res) => {
  const { username, userId } = req.body;

  try {
    const newUser = new User({ username, userId });
    await newUser.save();
    res.status(200).send({ message: 'User saved successfully' });
  } catch (error) {
    res.status(500).send({ message: 'Error saving user', error });
  }
});

module.exports = router;
