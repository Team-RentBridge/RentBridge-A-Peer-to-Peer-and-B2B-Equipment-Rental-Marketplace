require('dns').setDefaultResultOrder('ipv4first');
require('dotenv').config();
const pool = require('./config/db');

async function testConnection() {
  try {
    const res = await pool.query('SELECT NOW()');
    console.log('✅ Connection successful:', res.rows[0]);
    
    const adminCheck = await pool.query("SELECT * FROM admin");
    console.log("Admin OK", adminCheck.rows);

    process.exit(0);
  } catch (err) {
    console.error('❌ Connection error:', err);
    process.exit(1);
  }
}

testConnection();
