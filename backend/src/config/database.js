const { Pool } = require("pg");
const path = require("path");
const { time } = require("console");

if (!process.env.DB_HOST && !process.env.VERCEL) {
  require("dotenv").config({ path: path.join(__dirname, "../../../../.env") });
}

console.log("Database config:", {
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  user: process.env.DB_USER,
  port: process.env.DB_PORT,
  hasPassword: !!process.env.DB_PASSWORD,
  hasPostgresUrl: !!process.env.POSTGRES_URL,
});

const poolConfig = process.env.POSTGRES_URL
  ? {
      connectionString: process.env.POSTGRES_URL,
      ssl:
        process.env.NODE_ENV === "production"
          ? { rejectUnauthorized: false }
          : false,
    }
  : {
      user: process.env.DB_USER,
      host: process.env.DB_HOST,
      database: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
      port: process.env.DB_PORT,
      timeout: 20000,
      ssl:
        process.env.DB_HOST && process.env.DB_HOST.includes("neon.tech")
          ? {
              rejectUnauthorized: false,
              require: true,
            }
          : false,
      keepAlive: true,
      keepAliveInitialDelayMillis: 10000,
    };

const pool = new Pool({
  ...poolConfig,
  max: 5,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 10000,
  statement_timeout: 30000,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("Unexpected error on idle PostgreSQL client", err);
  if (process.env.VERCEL !== "1") {
    process.exit(-1);
  }
});

module.exports = {
  pool,
};
