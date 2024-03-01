const authenticateToken = require("../middleware/authMiddleware");
const Task = require("../models/Task");
const express = require("express");
const User = require("../models/User");
const router = express.Router();

router.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "http://localhost:3001",
    "Access-Control-Allow-Credentials": true,
  }),
    next();
});

router.post(
  "/assign-task",
  authenticateToken((role = "manager")),
  async (req, res) => {
    console.log(req.body);
    const { assignee_email, task_name, task_desc, dead_line, effort } =
      req.body;
    const assignee = await User.findOne(
      { user_email: assignee_email },
      { _id: 1 }
    );
    const assignee_id = assignee._id;
    const assigner_id = req.user.user_id;
    try {
      const task = new Task({
        assigner_id,
        assignee_id,
        task_name,
        task_desc,
        dead_line,
        effort,
        status: "P",
      });
      const savedTask = await task.save();
      res.status(200).json({ message: "task added successfully" });
    } catch {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/tasks", authenticateToken((role = "")), async (req, res) => {
  console.log("requested tasks");
  try {
    const user_id = req.user.user_id;
    if (req.user.role === "manager")
      var tasks = await Task.find(
        { assigner_id: user_id },
        { assigner_id: 0, __v: 0 }
      );
    else
      var tasks = await Task.find(
        { assignee_id: user_id },
        { _id: 0, assignee_id: 0, __v: 0 }
      );
    res.status(200).json(tasks);
  } catch {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/delete-task",authenticateToken(role="manager"), async (req, res) => {
  try{
    const task_id = req.query.task_id;
    console.log(task_id);
    const deletedTask  = await Task.findByIdAndDelete(task_id);
    if(deletedTask){
      res.status(200).json({message: "task deleted successfully"});
    }
    else{
      res.status(400).json({message: "task not found"});
    }
  }
  catch{
    res.status(500).json({ error: error.message });
  }
});

router.patch("/update-task",authenticateToken("manager"), async (req, res) =>{
  try{
    const { task_id,updated_task } = req.body;
    const updatedTask = await Task.updateOne({_id:task_id},{task_name:updated_task.task_name,task_desc:updated_task.task_desc,dead_line:updated_task.dead_line,effort:updated_task.effort})
    if(updatedTask){
      res.status(200).json({message: "task updated successfully"});
    }
    else{
      res.status(400).json({message: "task not found"});
    }
  }
  catch{
    res.status(500).json({ error: error.message });
  }
})

module.exports = router;
