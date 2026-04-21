const pool = require("../config/db");
const bcrypt = require("bcryptjs");

const createTables = async () => {
  try {
    // Users table (regular users only — no admin role here)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role VARCHAR(50) DEFAULT 'user',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Admin table (separate from users)
    await pool.query(`
      CREATE TABLE IF NOT EXISTS admin (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Equipment table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS equipment (
        id SERIAL PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        price_per_day DECIMAL(10,2) NOT NULL,
        penalty_per_day DECIMAL(10,2) DEFAULT 0,
        category VARCHAR(100) DEFAULT 'General',
        owner_id INTEGER REFERENCES users(id),
        available_from DATE,
        available_to DATE,
        image_url VARCHAR(500),
        quantity INTEGER DEFAULT 1,
        is_featured BOOLEAN DEFAULT false,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Bookings table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS bookings (
        id SERIAL PRIMARY KEY,
        user_id INTEGER REFERENCES users(id),
        equipment_id INTEGER REFERENCES equipment(id),
        start_date DATE NOT NULL,
        end_date DATE NOT NULL,
        quantity INTEGER DEFAULT 1,
        total_price DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Payments table
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

    // Penalties table
    await pool.query(`
      CREATE TABLE IF NOT EXISTS penalties (
        id SERIAL PRIMARY KEY,
        booking_id INTEGER REFERENCES bookings(id),
        late_days INTEGER NOT NULL,
        penalty_amount DECIMAL(10,2) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Reviews table
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

    // Seed: Admin (separate table)
    const adminCount = await pool.query("SELECT COUNT(*) FROM admin");
    if (parseInt(adminCount.rows[0].count) === 0) {
      const hashedAdminPass = await bcrypt.hash("admin123", 10);
      await pool.query(
        `INSERT INTO admin (email, password) VALUES ($1, $2)`,
        ["admin@rentbridge.com", hashedAdminPass]
      );
      console.log("✅ Default admin created: admin@rentbridge.com / admin123");
    }

    // Seed: Regular users
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    if (parseInt(userCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO users (name, email, password, role)
        VALUES
        ('John Doe', 'john@example.com', '$2b$10$jeBGAU0tj1m1j8C3.Wce5eEoJJYXEe5R5vdRk4hS7CakIX8zSATDq', 'user'),
        ('Jane Smith', 'jane@example.com', '$2b$10$jeBGAU0tj1m1j8C3.Wce5eEoJJYXEe5R5vdRk4hS7CakIX8zSATDq', 'user')
      `);
    }

    const equipmentCount = await pool.query("SELECT COUNT(*) FROM equipment");
    if (parseInt(equipmentCount.rows[0].count) === 0) {
      await pool.query(`
        INSERT INTO equipment (title, description, price_per_day, penalty_per_day, category, owner_id, image_url, quantity, is_featured)
        VALUES
        ('MacBook Pro 16"', 'High-performance laptop for professionals', 150.00, 50.00, 'Electronics', 1, 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400', 5, true),
        ('Canon EOS R5', 'Professional camera for photography', 200.00, 75.00, 'Electronics', 2, 'https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400', 3, false),
        ('Mountain Bike', 'Trek mountain bike for outdoor adventures', 50.00, 20.00, 'Bikes', 1, 'https://images.unsplash.com/photo-1471506480208-91b3a4cc6372?w=400', 7, true),
        ('Chemistry Lab Set', 'Complete chemistry lab equipment', 100.00, 30.00, 'Books', 2, 'https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=400', 2, false),
        ('Projector', '4K projector for presentations', 80.00, 25.00, 'Electronics', 1, 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400', 4, false),
        ('Drone', 'DJI Mavic Air 2 for aerial photography', 120.00, 40.00, 'Electronics', 2, 'https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400', 6, true),
        ('Camping Tent', '4-person waterproof camping tent', 30.00, 10.00, 'Outdoor', 1, 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400', 10, false),
        ('Power Generator', 'Portable 2000W generator', 60.00, 20.00, 'Tools', 2, 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400', 3, false),
        ('Sound System', 'Professional audio speakers', 90.00, 30.00, 'Electronics', 1, 'https://images.unsplash.com/photo-1545167622-3a6ac756afa4?w=400', 5, true),
        ('Kayak', 'Single-person inflatable kayak', 40.00, 15.00, 'Water Sports', 2, 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=400', 8, false)
      `);
    }

    console.log("✅ Database tables created and sample data inserted");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

module.exports = createTables;