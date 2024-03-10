// Example route for creating a user
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const authenticateToken = require("../middleware/authMiddleware");

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

router.patch("/change-password",authenticateToken(role=""),async (req,res)=>{
  
  try{
    const { current_password, new_password } = req.body;
    console.log(req.body);
    const user = await User.findOne({_id:req.user.user_id});
    console.log("check");
    if(!user) return res.status(400).json({message: "user not found"});
    const isPasswordValid = await bcrypt.compare(current_password, user.password);
    
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" }); 
    }
    else{
      const hashedPassword = await bcrypt.hash(new_password, 10);
      await User.updateOne({_id:req.user.user_id},{password:hashedPassword});
      res.status(200).json({message: "success"});
    }
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/employees",authenticateToken(role="manager"), async (req,res)=>{
  try{
    console.log("check")
    const employees = await User.find({role:"employee"},{user_name:1,user_email:1});
    if(!employees){
      return res.status(400).json({message: "no employees"});
    }
    else{
      res.status(200).json(employees);
    }
  }
  catch(error) {
    res.status(500).json({ error: error.message });
  }
})

router.get("/logout",(req,res)=>{
  res.cookie('token', '', { expires: new Date(0) });
  res.json({ redirect: '/login' });
})

module.exports = router;
