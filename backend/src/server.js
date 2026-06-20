require('dotenv').config();
const express          = require('express');
const cors             = require('cors');
const connectDB        = require('./config/db');
const authRoutes               = require('./routes/authRoutes');
const userRoutes               = require('./routes/userRoutes');
const businessPlanRoutes       = require('./routes/businessPlanRoutes');
const productDescriptionRoutes = require('./routes/productDescriptionRoutes');

const app  = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/auth',          authRoutes);
app.use('/api/user',          userRoutes);
app.use('/api/business-plan',       businessPlanRoutes);
app.use('/api/product-description', productDescriptionRoutes);

app.get('/api/health', (_req, res) => res.json({ status: 'ok' }));
app.use((_req, res) => res.status(404).json({ message: 'Route not found' }));

app.listen(PORT, () => console.log(`🚀 Server running at http://localhost:${PORT}`));
