require('dotenv').config();
const express          = require('express');
const cors             = require('cors');
const path             = require('path');
const connectDB        = require('./config/db');
const authRoutes               = require('./routes/authRoutes');
const userRoutes               = require('./routes/userRoutes');
const businessPlanRoutes       = require('./routes/businessPlanRoutes');
const productDescriptionRoutes = require('./routes/productDescriptionRoutes');
const adminRoutes              = require('./routes/adminRoutes');
const progressRoutes           = require('./routes/progressRoutes');
const priceSuggestionRoutes    = require('./routes/priceSuggestionRoutes');
const passport                 = require('./config/passport');

const app  = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());

app.use('/api/auth',          authRoutes);
app.use('/api/user',          userRoutes);
app.use('/api/business-plan',       businessPlanRoutes);
app.use('/api/product-description', productDescriptionRoutes);
app.use('/api/admin',               adminRoutes);
app.use('/api/progress',            progressRoutes);
app.use('/api/price-suggestions',   priceSuggestionRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));

/* ── Serve React build in production ──────────── */
if (process.env.NODE_ENV === 'production') {
  const frontendDist = path.join(__dirname, '../../Frontend/dist');
  app.use(express.static(frontendDist));
  app.get('*', (_req, res) => {
    res.sendFile(path.join(frontendDist, 'index.html'));
  });
} else {
  app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));
}

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
