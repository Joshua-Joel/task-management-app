const chalk = require("chalk");
const { cron } = require("./src/app/app");
const KafkaConfig = require("./config/config");
const User = require("./models/User");
const Task = require("./models/Task");

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
  KafkaConfig.produce("my-topic", messages);
};

cron.schedule("*/2 * * * *", () => {
  produceMessage().catch(console.error);
});
