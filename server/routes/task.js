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
    try {
      console.log(req.body);
      const { assignee_email, task_name, task_desc, dead_line, effort } =
        req.body;
      const assignee = await User.findOne(
        { user_email: assignee_email },
        { _id: 1 }
      );
      if (!assignee) {
        res.status(400).json({ message: "employee not found..!" }).send();
      } else {
        const assignee_id = assignee._id;
        const assigner_id = req.user.user_id;

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
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.get("/tasks", authenticateToken((role = "")), async (req, res) => {
  console.log("requested tasks");
  try {
    const user_id = req.user.user_id;
    if (req.user.role === "manager") {
      var tasks = await Task.find(
        { assigner_id: user_id },
        { assigner_id: 0, __v: 0 }
      );
      modTasks = [];
      for (var i = 0; i < tasks.length; i++) {
        var user = await User.find(
          { _id: tasks[i].assignee_id },
          { user_name: 1, user_email: 1, _id: 0 }
        );
        console.log("user_name: " + user);
        let {
          _id,
          assignee_id,
          task_name,
          task_desc,
          dead_line,
          effort,
          status,
          created_at,
        } = tasks[i];
        console.log();
        modTasks.push({
          _id,
          assignee_id,
          assignee_name: Object.values(user)[0].user_name,
          assignee_email: Object.values(user)[0].user_email,
          task_name,
          task_desc,
          dead_line,
          effort,
          status,
          created_at,
        });
      }
    } else {
      var tasks = await Task.find({ assignee_id: user_id }, { __v: 0 });
      modTasks = [];
      for (var i = 0; i < tasks.length; i++) {
        var user = await User.find(
          { _id: tasks[i].assigner_id },
          { user_name: 1, _id: 0 }
        );
        console.log("user_name: " + user);
        let {
          _id,
          assigner_id,
          task_name,
          task_desc,
          dead_line,
          effort,
          status,
          created_at,
        } = tasks[i];
        console.log();
        modTasks.push({
          _id,
          assigner_id,
          assigner_name: Object.values(user)[0].user_name,
          task_name,
          task_desc,
          dead_line,
          effort,
          status,
          created_at,
        });
      }
    }
    console.log(modTasks);
    res.status(200).json(modTasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(
  "/waiting-tasks",
  authenticateToken((role = "manager")),
  async (req, res) => {
    console.log("requested tasks");
    try {
      const user_id = req.user.user_id;
      if (req.user.role === "manager") {
        var tasks = await Task.find(
          { assigner_id: user_id, status: "W" },
          { assigner_id: 0, __v: 0 }
        );
        modTasks = [];
        for (var i = 0; i < tasks.length; i++) {
          var user = await User.find(
            { _id: tasks[i].assignee_id },
            { user_name: 1, user_email: 1, _id: 0 }
          );
          console.log("user_name: " + user);
          let {
            _id,
            assignee_id,
            task_name,
            task_desc,
            dead_line,
            effort,
            status,
            created_at,
          } = tasks[i];
          console.log();
          modTasks.push({
            _id,
            assignee_id,
            assignee_name: Object.values(user)[0].user_name,
            assignee_email: Object.values(user)[0].user_email,
            task_name,
            task_desc,
            dead_line,
            effort,
            status,
            created_at,
          });
        }
      }
      console.log(modTasks);
      res.status(200).json(modTasks);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.delete(
  "/delete-task",
  authenticateToken((role = "manager")),
  async (req, res) => {
    try {
      const task_id = req.query.task_id;
      console.log(task_id);
      const deletedTask = await Task.findByIdAndDelete(task_id);
      if (deletedTask) {
        res.status(200).json({ message: "task deleted successfully" });
      } else {
        res.status(400).json({ message: "task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.patch("/update-task", authenticateToken("manager"), async (req, res) => {
  try {
    const { task_id, updated_task } = req.body;
    console.log(req.body);
    try {
      var user = await User.findOne(
        { user_email: updated_task.assignee_email },
        { _id: 1 }
      );
      if (!user) res.status(400).json({ message: "user not found" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    const updatedTask = await Task.updateOne(
      { _id: task_id },
      {
        assignee_id: user._id,
        task_name: updated_task.task_name,
        task_desc: updated_task.task_desc,
        dead_line: updated_task.dead_line,
        effort: updated_task.effort,
      }
    );
    if (updatedTask) {
      res.status(200).json({ message: "task updated successfully" });
    } else {
      res.status(400).json({ message: "task not found" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.patch(
  "/complete-task",
  authenticateToken((role = "manager")),
  async (req, res) => {
    try {
      const task_id = req.query.task_id;
      const updated_task = await Task.updateOne(
        { _id: task_id },
        { status: "C" }
      );
      if (updated_task) {
        res.status(200).json({ message: "task completed successfully" });
      } else {
        res.status(400).json({ message: "task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.patch(
  "/decline-task",
  authenticateToken((role = "manager")),
  async (req, res) => {
    try {
      const task_id = req.query.task_id;
      const updated_task = await Task.updateOne(
        { _id: task_id },
        { status: "P" }
      );
      if (updated_task) {
        res.status(200).json({ message: "task updated successfully" });
      } else {
        res.status(400).json({ message: "task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

router.patch(
  "/request-approval",
  authenticateToken((role = "")),
  async (req, res) => {
    try {
      const task_id = req.query.task_id;
      const updated_task = await Task.updateOne(
        { _id: task_id },
        { status: "W" }
      );
      if (updated_task) {
        res.status(200).json({ message: "task updated successfully" });
      } else {
        res.status(400).json({ message: "task not found" });
      }
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

module.exports = router;
