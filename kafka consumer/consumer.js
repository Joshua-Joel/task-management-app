const KafkaConfig = require("./config/config")

KafkaConfig.consume("my-topic",(value)=>{
  console.log("Received :",value);
})