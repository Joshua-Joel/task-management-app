import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import  {Alert}  from "@mui/material";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";

import { Box, FormControl, TextField } from "@mui/material";

export default function TaskWizard() {
  const [open, setOpen] = React.useState(false);
  const [emailError,setEmailError] = React.useState(false);
  const [effortError,setEffortError] = React.useState(false);
  const [taskData, setTaskData] = React.useState({
    assignee_email: "",
    task_name: "",
    task_desc: "",
    dead_line: "",
    effort: "",
  });

 
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
    
  };

  const handleAssign = async () => {
    const days = calculateDaysBetweenDates(formattedDate,taskData.dead_line);
    console.log(taskData);
    if(taskData.effort > days || taskData.effort <= 0)
    {
      setEffortError(true);
    }
    else{
    try {
      const response = await fetch(
        "http://localhost:3000/api/task/assign-task",
        {
          method: "POST",
          redirect: "follow",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(taskData),
        }
      );
      const res = await response.json();
      if(res.message === "employee not found..!")
      {
        setEmailError(true);
      }
      else
    {
      console.log(res);
      setTaskData({
        assignee_email: "",
        task_name: "",
        task_desc: "",
        dead_line: "",
        effort: "",
      });
      setOpen(false);
      setEmailError(false);
      setEffortError(false);
    }
    } catch (err) {
      console.log(err);
    }
  
  }

  
  };

  const today = new Date();
  function formatDateToYYYYMMDD(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  }
  const formattedDate = formatDateToYYYYMMDD(today);

  const calculateDaysBetweenDates = (startDate, endDate) => {
    const oneDay = 24 * 60 * 60 * 1000; // hours * minutes * seconds * milliseconds

    const startDateTime = new Date(startDate);
    const endDateTime = new Date(endDate);

    // Calculate the difference in milliseconds
    const timeDifference = Math.abs(endDateTime - startDateTime);

    // Calculate the number of days
    const numberOfDays = Math.round(timeDifference / oneDay);

    return numberOfDays;
  };

  return (
    <React.Fragment>
      <Button
        onClick={handleClickOpen}
        sx={{ my: 2, color: "white", display: "block" }}
      >
        Create task
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
            <strong style={{ fontSize: "22px" }}>New Task</strong>
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
                required="true"
                value={taskData.assignee_email}
                onChange={handleInputChange}
              />
              {emailError && (
              <Alert
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
              >
               Employee Not Found..!
              </Alert>
            )}
              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                name="task_name"
                label="Task name"
                variant="outlined"
                required="true"
                value={taskData.task_name}
                onChange={handleInputChange}
              />

              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                label="Task description"
                multiline
                maxRows={4}
                name="task_desc"
                required="true"
                value={taskData.task_desc}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                label="Dead line"
                type="date"
                inputProps={{
                  min:  formattedDate,
                }}
                
                InputLabelProps={{
                  shrink: true,
                }}
                name="dead_line"
                required="true"
                value={taskData.dead_line}
                onChange={handleInputChange}
              />
              <TextField
                style={{ margin: " 10px 0 10px 0" }}
                type="number"
                name="effort"
                label="Effort"
                variant="outlined"
                required="true"
        
                value={taskData.effort}
                onChange={handleInputChange}
              />
              {effortError && (
              <Alert
                icon={<ErrorOutlineIcon fontSize="inherit" />}
                severity="error"
              >
               Effort can't exceed Deadline
              </Alert>
            )}
              <Button
                style={{ margin: "20px 0" }}
                variant="contained"
                onClick={handleAssign}
                
                disabled = {!(taskData.assignee_email && taskData.task_name && taskData.task_desc && taskData.dead_line && taskData.effort)}
              >
                Assign
              </Button>
            
            </FormControl>
          </div>
        </Box>
      </Dialog>

    </React.Fragment>
  );
}
