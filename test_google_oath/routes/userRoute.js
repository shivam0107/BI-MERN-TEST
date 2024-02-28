// Import the required modules
const express = require("express");
const router = express.Router();

const { login, signUp } = require("../controllers/Auth");

// User route

// Route for user login
router.post("/login", login);
router.post("/signup", signUp);

module.exports = router;
