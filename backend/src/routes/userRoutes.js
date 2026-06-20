const express = require('express');
const { protect } = require('../middleware/authMiddleware');
const User = require('../models/User');

const router = express.Router();

/* ── GET /api/user/profile ────────────────────── */
router.get('/profile', protect, (req, res) => {
  res.json({ user: req.user });
});

/* ── PUT /api/user/profile ────────────────────── */
router.put('/profile', protect, async (req, res) => {
  try {
    const { name, avatar } = req.body;
    const user = await User.findById(req.user._id);

    if (name)   user.name   = name;
    if (avatar) user.avatar = avatar;

    await user.save();
    res.json({ user });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
