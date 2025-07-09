// config/db.js
// PostgreSQL connection setup for TechCare Africa Helpdesk
const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

const connectDB = async () => {
  try {
    await pool.query('SELECT 1');
    console.log('PostgreSQL connected');
  } catch (err) {
    console.error('DB connection error:', err);
    process.exit(1);
  }
};

module.exports = { pool, connectDB }; 