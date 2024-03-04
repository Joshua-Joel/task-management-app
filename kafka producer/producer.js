const chalk = require('chalk');
const {cron} = require('./src/app/app');
const KafkaConfig = require("./config/config");
const User = require('./models/User');
const Task = require('./models/Task');

const produceMessage = async ()=>{
    const today = new Date();
    console.log("today "+today+1)
    console.log("today "+today+1)
    today.setDate(today.getDate()+1);
    // const oneDayAfter = new Date();
    // console.log("one day after"+oneDayAfter)
    // oneDayAfter.setDate(today + 1);
    // console.log("one day after"+oneDayAfter)
    // console.log(oneDayAfter);
    const tasks = await Task.find({
        due_date: today 
      },{assignee_id:1});
    for (const task of tasks){
        console.log(task);
    }
}
produceMessage();
cron.schedule('0 0 * * *', () => {
    notifyEmployees().catch(console.error);
});