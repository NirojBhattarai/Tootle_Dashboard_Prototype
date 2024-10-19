const express = require("express");
const router = express.Router();
const pool = require("../db");

router.post("/adduser", async (req, res) => {
  try {
    const { name, email, password, role, phone_number } = req.body;

    await pool.query(
      "INSERT INTO users(name, email, password, role, phone_number) VALUES (?, ?, ?, ?, ?)",
      [name, email, password, role, phone_number]
    );
    res.status(201).send("Data added successfully");
  } catch (err) {
    console.error("Error adding user data", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
