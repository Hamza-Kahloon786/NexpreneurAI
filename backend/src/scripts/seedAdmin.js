require('dotenv').config({ path: require('path').resolve(__dirname, '../../.env') });
const mongoose = require('mongoose');
const User     = require('../models/User');

// Set ADMIN_EMAIL / ADMIN_PASSWORD to choose your own credentials.
// The built-in defaults are only allowed against a local database.
const DEFAULT_EMAIL    = 'admin@nexpreneuai.com';
const DEFAULT_PASSWORD = 'Admin@1234';

const isLocalDb = /localhost|127\.0\.0\.1/.test(process.env.MONGO_URI || '');
const usingEnvPassword = !!process.env.ADMIN_PASSWORD;

if (!isLocalDb && !usingEnvPassword) {
  console.error('❌ Refusing to seed a non-local database with the default admin password.');
  console.error('   Set ADMIN_PASSWORD (and optionally ADMIN_EMAIL) and run again.');
  process.exit(1);
}

const ADMIN = {
  name:     'Super Admin',
  email:    process.env.ADMIN_EMAIL    || DEFAULT_EMAIL,
  password: process.env.ADMIN_PASSWORD || DEFAULT_PASSWORD,
  provider: 'local',
  isAdmin:  true,
  isActive: true,
};

// Never echo a password the user chose themselves
const shownPassword = usingEnvPassword ? '(the ADMIN_PASSWORD you set)' : ADMIN.password;

async function seed() {
  await mongoose.connect(process.env.MONGO_URI);
  console.log('✅ Connected to MongoDB');

  const existing = await User.findOne({ email: ADMIN.email });
  if (existing) {
    console.log('⚠️  Admin already exists — skipping creation.');
    console.log(`   Email   : ${ADMIN.email}`);
    console.log(`   Password: ${shownPassword}`);
    await mongoose.disconnect();
    return;
  }

  await User.create(ADMIN);

  console.log('🎉 Admin user created successfully!');
  console.log('─────────────────────────────────');
  console.log(`   Email   : ${ADMIN.email}`);
  console.log(`   Password: ${shownPassword}`);
  console.log('─────────────────────────────────');
  console.log('👉 Admin login page: /admin/login');

  await mongoose.disconnect();
}

seed().catch((err) => {
  console.error('❌ Seed failed:', err.message);
  process.exit(1);
});
