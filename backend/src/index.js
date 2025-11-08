const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const translationRoutes = require("./routes/translationRoutes");
const productRoutes = require("./routes/productRoutes");
const { pool } = require("./config/database");

if (!process.env.VERCEL) {
  dotenv.config({ path: path.join(__dirname, "../../../.env") });
}

const app = express();
const PORT = process.env.PORT || 5000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", translationRoutes);
app.use("/api", productRoutes);

app.get("/health", async (req, res) => {
  try {
    await pool.query('SELECT 1');
    res.json({
      status: "ok",
      message: "Server is running",
      database: "connected"
    });
  } catch (error) {
    res.status(503).json({
      status: "error",
      message: "Server is running but database connection failed",
      database: "disconnected"
    });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message,
  });
});

if (process.env.VERCEL !== '1') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

module.exports = app;
