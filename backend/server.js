require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authRoutes = require("./routes/authRoutes");
const equipmentRoutes = require("./routes/equipmentRoutes");
const bookingRoutes = require("./routes/bookingRoutes");
const userRoutes = require("./routes/userRoutes");
const adminRoutes = require("./routes/adminRoutes");

const pool = require("./config/db");
const createTables = require("./db/init");

const app = express();


// ✅ 1. SECURITY (first)
app.use(helmet());

// ✅ 2. CORS (before routes)
app.use(cors({
  origin: "http://localhost:3000", // frontend URL
  credentials: true
}));

// ✅ 3. BODY PARSER
app.use(express.json());


// ✅ 4. ROUTES
app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/user", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));

// ✅ 5. TEST DB
app.get("/test-db", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({
      message: "DB Connected ✅",
      time: result.rows[0]
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "DB Connection Failed ❌",
      error: err.message
    });
  }
});


// ✅ 6. ROOT ROUTE
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});


// ✅ 7. GLOBAL ERROR HANDLER (VERY IMPORTANT)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    message: "Something went wrong",
    error: err.message
  });
});


// ✅ 8. START SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});