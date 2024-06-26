const express = require("express");
const { register, login } = require("../controllers/authController");

const router = express.Router();

router.post("/api/auth/register", register); // POST /api/auth/register - Register a new user
router.post("/api/auth/login", login);       // POST /api/auth/login - Login a user

module.exports = router;
