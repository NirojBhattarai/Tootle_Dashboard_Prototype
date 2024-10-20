require("dotenv").config();
const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: 3306,
  connectionLimit: 10,
  waitForConnections: true,
  queueLimit: 0,
  acquireTimeout: 10000, // 10 seconds
  connectTimeout: 10000, // 10 seconds
});

module.exports = pool;
