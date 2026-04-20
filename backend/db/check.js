require('dotenv').config();
const pool = require('../config/db');

(async () => {
  try {
    const users = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='users'");
    console.log('users columns:', users.rows.map(r => r.column_name).join(', '));
    
    const equipment = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='equipment'");
    console.log('equipment columns:', equipment.rows.map(r => r.column_name).join(', '));
    
    const bookings = await pool.query("SELECT column_name FROM information_schema.columns WHERE table_name='bookings'");
    console.log('bookings columns:', bookings.rows.map(r => r.column_name).join(', '));

    const all_users = await pool.query("SELECT id, name, email, role FROM users LIMIT 5");
    console.log('users data:', JSON.stringify(all_users.rows));

    process.exit(0);
  } catch (e) {
    console.error(e.message);
    process.exit(1);
  }
})();
