const express = require("express");
const router = express.Router();

// Create get request to root route
router.get("/", (req, res) => {
  res.send("Server is running");
});

module.exports = router;
