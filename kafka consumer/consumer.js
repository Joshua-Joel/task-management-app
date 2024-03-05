import  KafkaConfig from "./config/config.js"
import { sendMail } from './services/mailService.js';

const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic",(value)=>{
  console.log("Received :",JSON.parse(value));
  const message = JSON.parse(value);
  const {user_email,task_name,dead_line} = message;
  console.log(user_email,task_name,dead_line);
  const email_body = "You have a pending task("+task_name+") and its deadine is "+ dead_line;
  const email_subject = "Task reminder..!";
  sendMail(user_email, email_subject, email_body)
    .then(response => {
        console.log('Email sent successfully:', response);
    })
    .catch(error => {
        console.error('Error sending email:', error);
    });
})
