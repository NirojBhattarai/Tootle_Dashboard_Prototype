const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/viewuser", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM users");
    res.status(200).json(rows);
  } catch (err) {
    console.error("Error Fetching user data", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
