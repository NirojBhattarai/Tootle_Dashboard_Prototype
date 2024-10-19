const express = require("express");
const router = express.Router();
const pool = require("../db");

router.put("/updateuser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const { name, email, password, role, phone_number } = req.body;

    await pool.query(
      "UPDATE users SET name = ?, email = ?, password = ?, role = ?, phone_number = ? WHERE id = ?",
      [name, email, password, role, phone_number, id]
    );

    res.status(200).send("Data updated successfully");
  } catch (err) {
    console.error("Error updating user data", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
