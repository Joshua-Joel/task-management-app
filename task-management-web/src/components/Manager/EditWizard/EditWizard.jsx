import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import EditIcon from "@mui/icons-material/Edit";

import { Box, FormControl, TextField } from "@mui/material";

export default function EditWizard({ values }) {
  const [open, setOpen] = React.useState(false);

  const [taskData, setTaskData] = React.useState({
    task_id: values._id,
    updated_task: {
      assignee_email: values.assignee_email,
      task_name: values.task_name,
      task_desc: values.task_desc,
      dead_line: "",
      effort: values.effort,
    },
  });
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({
        ...taskData,
        updated_task: {
          ...taskData.updated_task,
          [name]: value,
        },
      });
  };
  const handleAssign = async () => {
    console.log(taskData);
    try {
      const response = await fetch(
        "http://localhost:3000/api/task/update-task",
        {
          method: "PATCH",
          redirect: "follow",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );
      const res = await response.json();
      console.log(res);
      setOpen(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <React.Fragment>
      <Button onClick={handleClickOpen}>
        <EditIcon style={{ color: "blue", padding: "4px" }} />
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ height: "auto" }}
      >
        <Box
          style={{
            backgroundColor: "#fff",
            display: "flex",
            alignItems: "center",
            width: "40%",
            margin: "0 auto",
            height: "78%",
            padding: "10px",
            borderRadius: "10px",
            flexDirection: "column",
          }}
          component="form"
          noValidate
          autoComplete="off"
        >
          <div>
            <strong style={{ fontSize: "22px" }}>Edit Task</strong>
          </div>
          <div
            noValidate
            autoComplete="off"
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              width: "500px",
              height: "300px",
              padding: "20px",
              borderRadius: "10px",
              flexDirection: "column",
            }}
          >
            <FormControl sx={{ width: "45ch" }}>
              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                name="assignee_email"
                label="Assignee email"
                variant="outlined"
                value={taskData.updated_task.assignee_email}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                name="task_name"
                label="Task name"
                variant="outlined"
                value={taskData.updated_task.task_name}
                onChange={handleInputChange}
              />

              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                label="Task description"
                multiline
                maxRows={4}
                name="task_desc"
                value={taskData.updated_task.task_desc}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                label="Dead line"
                type="date"
                InputLabelProps={{
                  shrink: true,
                }}
                name="dead_line"
                value={taskData.updated_task.dead_line}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                type="number"
                name="effort"
                label="Effort"
                variant="outlined"
                value={taskData.updated_task.effort}
                onChange={handleInputChange}
              />
              <Button
                style={{ margin: "20px 0" }}
                variant="contained"
                onClick={handleAssign}
              >
                Update
              </Button>
            </FormControl>
          </div>
        </Box>
      </Dialog>
    </React.Fragment>
  );
}
