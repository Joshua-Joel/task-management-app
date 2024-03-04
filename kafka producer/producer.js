import chalk from "chalk";
import cron from "./src/app/app.js";
import KafkaConfig from "./config/config.js";
import User from './models/User.js';
import Task from './models/Task.js';


const kafkaInstance = new KafkaConfig();

const produceMessage = async () => {
  const messages = [];
  const today = new Date();
  console.log("today:", today);

  const twoDaysAfter = new Date(today);
  twoDaysAfter.setDate(today.getDate() + 2);

  console.log("two days after:", twoDaysAfter);

  const tasks = await Task.find(
    {
      dead_line: { $gte: today, $lt: twoDaysAfter },
    },
    { assignee_id: 1, task_name: 1 }
  );

  for (const task of tasks) {
    const user = await User.find({ _id: task.assignee_id }, { user_email: 1 });
    messages.push({user_email: user.user_email,task_name:task.task_name})
  }
  kafkaInstance.produce("my-topic", messages);
};

cron.schedule("*/2 * * * *", () => {
  produceMessage().catch(console.error);
});
