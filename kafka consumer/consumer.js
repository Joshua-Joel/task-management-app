import  KafkaConfig from "./config/config.js"

const kafkaConfig = new KafkaConfig();
kafkaConfig.consume("my-topic",(value)=>{
  console.log("Received :",value);
})