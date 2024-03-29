import chalk from "chalk";
import cron from "./src/app/app.js";
import KafkaConfig from "./config/config.js";
import User from './models/User.js';
import Task from './models/Task.js';


const kafkaInstance = new KafkaConfig();

const produceMessage = async () => {

  const today = new Date();

  const twoDaysAfter = new Date(today);
  twoDaysAfter.setDate(today.getDate() + 2);

  console.log("two days after:", twoDaysAfter);

  const tasks = await Task.find(
    {
      dead_line: { $gte: today, $lt: twoDaysAfter },
    },
    { assignee_id: 1, task_name: 1,dead_line:1 }
  );

  for (const task of tasks) {
    const messages = [];
    const user = await User.findOne({ _id: task.assignee_id }, { user_email: 1 });
    const Obj = {user_email: user.user_email,task_name:task.task_name,dead_line:task.dead_line.toDateString()};
    console.log(JSON.stringify(Obj))
    messages.push({key:"key-1",value:JSON.stringify(Obj)})
    kafkaInstance.produce("my-topic", messages);
  }
};

cron.schedule("*/5 * * * * *", () => {
  produceMessage().catch(console.error);
});
