const express  = require('express');
const jwt      = require('jsonwebtoken');
const passport = require('../config/passport');
const User     = require('../models/User');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

/* ── Helper: sign JWT ─────────────────────────── */
const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '7d',
  });

/* ── POST /api/auth/register ──────────────────── */
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: 'All fields are required' });

    if (password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(400).json({ message: 'Email already registered' });

    const user  = await User.create({ name, email, password });
    const token = signToken(user._id);

    res.status(201).json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ── POST /api/auth/login ─────────────────────── */
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: 'Email and password are required' });

    const user = await User.findOne({ email }).select('+password');
    if (!user || !user.password)
      return res.status(401).json({ message: 'Invalid credentials' });

    const valid = await user.comparePassword(password);
    if (!valid)
      return res.status(401).json({ message: 'Invalid credentials' });

    const token = signToken(user._id);
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ── GET /api/auth/me ─────────────────────────── */
router.get('/me', protect, (req, res) => {
  res.json({ user: req.user });
});

/* ── Google OAuth ─────────────────────────────── */
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'], session: false })
);

router.get(
  '/google/callback',
  passport.authenticate('google', { session: false, failureRedirect: `${process.env.FRONTEND_URL}/sign-in?error=google_failed` }),
  (req, res) => {
    const token = signToken(req.user._id);
    const user  = req.user.toJSON();

    // Redirect to frontend with token + basic user info
    const params = new URLSearchParams({
      token,
      name:   user.name,
      email:  user.email,
      avatar: user.avatar || '',
    });

    res.redirect(`${process.env.FRONTEND_URL}/auth/callback?${params.toString()}`);
  }
);

module.exports = router;
