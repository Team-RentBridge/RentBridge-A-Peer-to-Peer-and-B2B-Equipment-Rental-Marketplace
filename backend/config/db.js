
const { Pool } = require("pg");
const dns = require("dns");

// Force IPv4 to fix ENETUNREACH on Render free tier (Supabase resolves to IPv6)
dns.setDefaultResultOrder("ipv4first");

const pool = new Pool({
  connectionString: process.env.DB_URL,
  ssl: { rejectUnauthorized: false },
});

module.exports = pool;