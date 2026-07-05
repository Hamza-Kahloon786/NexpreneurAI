const express  = require('express');
const bcrypt   = require('bcryptjs');
const User     = require('../models/User');
const { adminProtect } = require('../middleware/adminMiddleware');

const router = express.Router();

/* All admin routes are protected */
router.use(adminProtect);

/* ── GET /api/admin/stats ─────────────────────── */
router.get('/stats', async (req, res) => {
  try {
    const total    = await User.countDocuments({ isAdmin: { $ne: true } });
    const active   = await User.countDocuments({ isAdmin: false, isActive: true });
    const inactive = await User.countDocuments({ isAdmin: false, isActive: false });

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    const newThisMonth = await User.countDocuments({
      isAdmin:   false,
      createdAt: { $gte: startOfMonth },
    });

    const startOfWeek = new Date();
    startOfWeek.setDate(startOfWeek.getDate() - startOfWeek.getDay());
    startOfWeek.setHours(0, 0, 0, 0);
    const newThisWeek = await User.countDocuments({
      isAdmin:   false,
      createdAt: { $gte: startOfWeek },
    });

    res.json({ total, active, inactive, newThisMonth, newThisWeek });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ── GET /api/admin/users ─────────────────────── */
router.get('/users', async (req, res) => {
  try {
    const { search = '', page = 1, limit = 20 } = req.query;
    const skip = (Number(page) - 1) * Number(limit);

    const query = { isAdmin: { $ne: true } };
    if (search) {
      query.$or = [
        { name:  { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
      ];
    }

    const [users, total] = await Promise.all([
      User.find(query)
        .select('-password -googleId')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit)),
      User.countDocuments(query),
    ]);

    res.json({ users, total, page: Number(page), pages: Math.ceil(total / Number(limit)) });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ── PATCH /api/admin/users/:id/status ───────── */
router.patch('/users/:id/status', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isAdmin) return res.status(400).json({ message: 'Cannot modify admin accounts' });

    user.isActive = !user.isActive;
    await user.save();

    res.json({ message: `User ${user.isActive ? 'activated' : 'deactivated'}`, isActive: user.isActive });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ── PATCH /api/admin/users/:id/password ─────── */
router.patch('/users/:id/password', async (req, res) => {
  try {
    const { password } = req.body;
    if (!password || password.length < 6)
      return res.status(400).json({ message: 'Password must be at least 6 characters' });

    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isAdmin) return res.status(400).json({ message: 'Cannot modify admin accounts' });

    user.password = password;
    await user.save();

    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

/* ── DELETE /api/admin/users/:id ─────────────── */
router.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    if (user.isAdmin) return res.status(400).json({ message: 'Cannot delete admin accounts' });

    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

module.exports = router;
