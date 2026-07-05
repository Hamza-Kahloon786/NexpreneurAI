require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User     = require('../models/User');

const ADMIN = {
  name:     'Super Admin',
  email:    'admin@nexpreneuai.com',
  password: 'Admin@1234',
  provider: 'local',
  isAdmin:  true,
  isActive: true,
};

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const existing = await User.findOne({ email: ADMIN.email });
  if (existing) {
    console.log('⚠️  Admin already exists — skipping creation.');
    console.log(`   Email   : ${ADMIN.email}`);
    console.log(`   Password: ${ADMIN.password}`);
    await mongoose.disconnect();
    return;
  }

  await User.create(ADMIN);

  console.log('🎉 Admin user created successfully!');
  console.log('─────────────────────────────────');
  console.log(`   Email   : ${ADMIN.email}`);
  console.log(`   Password: ${ADMIN.password}`);
  console.log('─────────────────────────────────');
  console.log('👉 Login at: http://localhost:5173/admin/login');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
