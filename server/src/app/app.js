require("dotenv").config();
const mongoose = require("../../services/db");
const scheduleTask = require("../../utils/scheduleTask");
const express = require("express");
const cookieParser = require('cookie-parser');
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ 
  origin: 'http://localhost:3001', 
  credentials: true
}));

const taskRoutes = require("../../routes/task");
const userRoutes = require("../../routes/user");
const authRoutes = require("../../routes/auth");

app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use("/api/task", taskRoutes); 
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Credentials": true
  })
  res.send("Heyyy you reached my server...!");
}); 

module.exports = app;
