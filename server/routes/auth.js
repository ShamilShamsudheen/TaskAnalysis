const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const { log } = require('console');
const router = express.Router();

router.post('/signup', async (req, res) => {
  const { firstName, lastName, email, password, confirmPassword } = req.body;
  
  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ message: 'Passwords do not match' });
  }

  try {
    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Encrypt password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save new user
    user = new User({ firstName, lastName, email, password: hashedPassword });
    await user.save();

    // Generate JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user information
    res.json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
      },
    });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});


router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  
  try {
    // Check if user exists
    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Check if password matches
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT token
    const payload = { userId: user.id };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send response with token and user information
    res.json({
      token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        userId:user._id
      },
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

router.post('/google', async (req, res) => {
  const { token } = req.body;
  
  try {
    // Verify the token with Google's OAuth API
    const response = await fetch(`${process.env.GOOGLE_OAUTH_API}${token}`);
    const data = await response.json();

    if (data.sub) {
      // Token is valid, find or create the user
      let user = await User.findOne({ email: data.email });
      if (!user) {
        user = new User({
          firstName: data.given_name,
          lastName: data.family_name,
          email: data.email,
          password: '', // No password for Google users
        });
        await user.save();
      }

      // Generate JWT token
      const jwtToken = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({
        token: jwtToken,
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          userId:user._id
        },
      });
    } else {
      res.status(401).json({ message: 'Invalid Google token' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


router.get('/google/callback', passport.authenticate('google'), (req, res) => {
  const token = jwt.sign({ userId: req.user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.redirect(`/auth?token=${token}&firstName=${req.user.firstName}&lastName=${req.user.lastName}&email=${req.user.email}`);
});

module.exports = router;
