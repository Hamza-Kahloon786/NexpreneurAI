const express     = require('express');
const { protect } = require('../middleware/authMiddleware');
const Activity    = require('../models/Activity');

const router = express.Router();

/* ── GET /api/progress/stats ────────────────────── */
router.get('/stats', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const [totalTasks, productsCreated] = await Promise.all([
      Activity.countDocuments({ userId }),
      Activity.countDocuments({ userId, type: 'product_description' }),
    ]);
    const rawHrs   = (totalTasks * 0.5).toFixed(1);
    const timeSaved = `${rawHrs} hrs`;
    res.json({ totalTasks, timeSaved, productsCreated });
  } catch (err) {
    console.error('Progress stats error:', err.message);
    res.status(500).json({ message: 'Failed to load stats.' });
  }
});

/* ── GET /api/progress/recent ───────────────────── */
router.get('/recent', protect, async (req, res) => {
  try {
    const activities = await Activity.find({ userId: req.user._id })
      .sort({ createdAt: -1 })
      .limit(5)
      .lean();
    res.json(activities.map((a) => ({ label: a.label, createdAt: a.createdAt })));
  } catch (err) {
    console.error('Progress recent error:', err.message);
    res.status(500).json({ message: 'Failed to load recent activity.' });
  }
});

/* ── GET /api/progress/chart ────────────────────── */
router.get('/chart', protect, async (req, res) => {
  try {
    const userId = req.user._id;
    const now    = new Date();

    /* build 10 rolling week ranges (oldest → newest) */
    const ranges = [];
    for (let i = 9; i >= 0; i--) {
      const end = new Date(now);
      end.setDate(now.getDate() - i * 7);
      end.setHours(23, 59, 59, 999);

      const start = new Date(end);
      start.setDate(end.getDate() - 6);
      start.setHours(0, 0, 0, 0);

      ranges.push({ start: new Date(start), end: new Date(end) });
    }

    const counts = await Promise.all(
      ranges.map(({ start, end }) =>
        Activity.countDocuments({ userId, createdAt: { $gte: start, $lte: end } })
      )
    );

    const chart = ranges.map(({ start }, i) => {
      const month   = start.toLocaleString('en-US', { month: 'short' });
      const weekNum = Math.ceil(start.getDate() / 7);
      return { label: [month, `Week ${weekNum}`], value: counts[i] };
    });

    res.json(chart);
  } catch (err) {
    console.error('Progress chart error:', err.message);
    res.status(500).json({ message: 'Failed to load chart data.' });
  }
});

module.exports = router;
