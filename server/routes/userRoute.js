// Import the required modules
const express = require("express");
const router = express.Router();

const { login, signUp, getAllUsers } = require("../controllers/Auth");

// User route

// Route for user login
router.post("/login", login);
router.post("/signup", signUp);
router.get("/all-users", getAllUsers);

module.exports = router;
