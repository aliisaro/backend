const express = require("express");
const requireAuth = require("../requireAuth");
const router = express.Router();

// Define the protected route
router.get("/api/protectedroute", requireAuth, async (req, res) => {
  // If the execution reaches here, it means the user is authenticated
  // You can access the authenticated user's information from req.user
  res
    .status(200)
    .json({ message: "Protected route accessed successfully", user: req.user });
});

module.exports = router;
