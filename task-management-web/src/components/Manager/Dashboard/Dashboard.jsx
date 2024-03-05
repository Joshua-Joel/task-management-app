import React, { useEffect, useState } from "react";
import ActionAreaCard from "./Card";
import Grid from "@mui/material/Grid";

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [completedTasksCount, setCompletedTasksCount] = useState(0);
  const [inProgressTasksCount, setInProgressTasksCount] = useState(0);
  const [notStartedTasksCount, setNotStartedTasksCount] = useState(0);
  const [yetTobeApprovedCount, setYetTobeApprovedCount] = useState(0);
  var currentDate = new Date().toISOString();
  // Fetch task
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/task/tasks", {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
        });

        const result = await response.json();
        setTasks(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const completedTasks = tasks.filter((task) => task.status === "C");
    const inProgressTasks = tasks.filter((task) => task.status === "P");
    const yetToApproveTasks = tasks.filter((task) => task.status === "W");
    const notStartedTasks = tasks.filter(
      (task) =>
        task.dead_line.split("T")[0] < currentDate.split("T")[0] &&
        task.status !== "C"
    );
    setCompletedTasksCount(completedTasks.length);
    setInProgressTasksCount(inProgressTasks.length);
    setNotStartedTasksCount(notStartedTasks.length);
    setYetTobeApprovedCount(yetToApproveTasks.length);
  }, [currentDate,tasks]);

  return (
    <Grid
      sx={{ flexGrow: 1 }}
      container
      spacing={2}
      style={{ paddingTop: "70px" }}
    >
      <Grid item>
        <Grid container justifyContent="center" spacing={3}>
          {[0, 1, 2, 3].map((value) => (
            <Grid key={value} item>
              <ActionAreaCard
                num={value}
                count={[
                  notStartedTasksCount,
                  inProgressTasksCount,
                  completedTasksCount,
                  yetTobeApprovedCount,
                ]}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Dashboard;
