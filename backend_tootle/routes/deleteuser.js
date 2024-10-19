const express = require("express");
const router = express.Router();
const pool = require("../db");

router.delete("/deleteuser/:id", async (req, res) => {
  const { id } = req.params;
  try {
    await pool.query("DELETE FROM users WHERE id = ?", [id]);

    res.status(200).send("Data Deleted successfully");
  } catch (err) {
    console.error("Error Deleting user data", err);
    res.status(500).send("Server error");
  }
});

module.exports = router;
