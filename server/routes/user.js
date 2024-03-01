// Example route for creating a user
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

router.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { user_name, user_email, password,role } = req.body;
    // Check if the user with the same email already exists
    const existingUser = await User.findOne({ user_email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new user
    const newUser = new User({
      user_name,
      user_email,
      password: hashedPassword,
      role
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.status(201).json({ message: "success" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
