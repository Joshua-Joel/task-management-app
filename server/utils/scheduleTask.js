const cron = require("node-cron");
const Task = require("../models/Task");

//fired daily on 00:00 AM  to change the of the overdue pending tasks to Overdue tasks
cron.schedule("0 0 * * *", async () => {
    try{
        const today = new Date();
        console.log(today);
        const updatedTask =await Task.updateMany({dead_line:{ $lt: today },status:"P"},{$set:{status:"O"}});
    }
    catch(err){
        console.log(err);
    }
  console.log("triggered");
});
