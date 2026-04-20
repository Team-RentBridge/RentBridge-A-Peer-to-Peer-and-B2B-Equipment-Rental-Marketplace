require('dotenv').config();
const pool = require('../config/db');
const bcrypt = require('bcryptjs');

(async () => {
  try {
    // Create admin table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ admin table ready');

    // Add category column to equipment if it doesn't exist (migration for existing DBs)
    await pool.query(`ALTER TABLE equipment ADD COLUMN IF NOT EXISTS category VARCHAR(100) DEFAULT 'General'`).catch(() => {});
    // Add penalty_per_day if missing
    await pool.query(`ALTER TABLE equipment ADD COLUMN IF NOT EXISTS penalty_per_day DECIMAL(10,2) DEFAULT 0`).catch(() => {});
    // Add is_featured if missing
    await pool.query(`ALTER TABLE equipment ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false`).catch(() => {});
    // Add quantity if missing
    await pool.query(`ALTER TABLE equipment ADD COLUMN IF NOT EXISTS quantity INTEGER DEFAULT 1`).catch(() => {});
    // Add role to users if missing
    await pool.query(`ALTER TABLE users ADD COLUMN IF NOT EXISTS role VARCHAR(50) DEFAULT 'user'`).catch(() => {});
    console.log('✅ equipment columns ready');

    // Create payments table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS payments (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id),
        amount DECIMAL(10,2) NOT NULL,
        deposit DECIMAL(10,2) DEFAULT 0,
        payment_status VARCHAR(50) DEFAULT 'pending',
        escrow_status VARCHAR(50) DEFAULT 'holding',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ payments table ready');

    // Create reviews table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS reviews (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        equipment_id INTEGER REFERENCES equipment(id),
        rating INTEGER CHECK (rating >= 1 AND rating <= 5),
        comment TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('✅ reviews table ready');

    // Seed admin if not exists
    const adminCount = await pool.query('SELECT COUNT(*) FROM admin');
    if (parseInt(adminCount.rows[0].count) === 0) {
      const hashedPass = await bcrypt.hash('admin123', 10);
      await pool.query(
        'INSERT INTO admin (email, password) VALUES ($1, $2)',
        ['admin@rentbridge.com', hashedPass]
      );
      console.log('✅ Admin seeded: admin@rentbridge.com / admin123');
    } else {
      console.log('ℹ️  Admin already seeded');
    }

    console.log('🎉 Migration complete!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Migration error:', err.message);
    process.exit(1);
  }
})();
