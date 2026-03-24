const pool = require("../config/db");

const createTables = async () => {
  try {
    // Users table
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
        total_price DECIMAL(10,2) NOT NULL,
        status VARCHAR(50) DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Insert sample data
    const userCount = await pool.query("SELECT COUNT(*) FROM users");
    if (parseInt(userCount.rows[0].count) === 0) {
      // Create admin user
      await pool.query(`
        INSERT INTO users (name, email, password, role)
        VALUES ('Admin', 'admin@rentbridge.com', '$2b$10$jeBGAU0tj1m1j8C3.Wce5eEoJJYXEe5R5vdRk4hS7CakIX8zSATDq', 'admin')
      `);

      // Create sample users
      await pool.query(`
        INSERT INTO users (name, email, password, role)
        VALUES
        ('John Doe', 'john@example.com', '$2b$10$jeBGAU0tj1m1j8C3.Wce5eEoJJYXEe5R5vdRk4hS7CakIX8zSATDq', 'user'),
        ('Jane Smith', 'jane@example.com', '$2b$10$jeBGAU0tj1m1j8C3.Wce5eEoJJYXEe5R5vdRk4hS7CakIX8zSATDq', 'user')
      `);
    }

    const equipmentCount = await pool.query("SELECT COUNT(*) FROM equipment");
    if (parseInt(equipmentCount.rows[0].count) === 0) {
      // Create sample equipment
      await pool.query(`
        INSERT INTO equipment (title, description, price_per_day, penalty_per_day, category, owner_id, image_url, is_featured)
        VALUES
        ('MacBook Pro 16"', 'High-performance laptop for professionals', 150.00, 50.00, 'Electronics', 2, 'https://example.com/macbook.jpg', true),
        ('Canon EOS R5', 'Professional camera for photography', 200.00, 75.00, 'Electronics', 3, 'https://example.com/camera.jpg', false),
        ('Mountain Bike', 'Trek mountain bike for outdoor adventures', 50.00, 20.00, 'Bikes', 2, 'https://example.com/bike.jpg', true),
        ('Chemistry Lab Set', 'Complete chemistry lab equipment', 100.00, 30.00, 'Books', 3, 'https://example.com/lab.jpg', false),
        ('Projector', '4K projector for presentations', 80.00, 25.00, 'Electronics', 2, 'https://example.com/projector.jpg', false)
      `);
    }

    console.log("✅ Database tables created and sample data inserted");
  } catch (err) {
    console.error("❌ Error creating tables:", err);
  }
};

module.exports = createTables;