
const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/User");


router.post("/login", async (req, res) => {
  console.log(req.body);
  try {
    const { user_email, password } = req.body;
    // Find the user by email
    const user = await User.findOne({ user_email });
    if (!user) {
      return res.status(401).json({ error: "Invalid user email" });
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" }); 
    }
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + 7);
    // Generate JWT token
    const token = jwt.sign(
      { user_email: user.user_email , user_id: user._id , role: user.role},
      process.env.JWT_SECRET_KEY
    );

    res.status(200).cookie("token", token, {
      httpOnly: true,
      sameSite:"lax",
      expire : 24 * 60 * 60 * 1000 
    }).json({token,message:"success",role:user.role});
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
