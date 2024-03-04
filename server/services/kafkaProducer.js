// const { Kafka ,Partitioners } = require('kafkajs');
// const kafkaConfig = require('../config/kafkaConfig');

// const producer = new Kafka({
//     clientId: kafkaConfig.clientId,
//     brokers: kafkaConfig.brokers,
//   }).producer({ createPartitioner: Partitioners.DefaultPartitioner });
  
//   const produceMessage = async (topic, message) => {
//     try {
//       await producer.connect();
      
//       // Produce a message to the specified topic
//       await producer.send({
//         topic: topic,
//         messages: [{ value: JSON.stringify(message) }],
//       });
  
//       console.log('Message produced successfully');
//     } catch (error) {
//       console.error('Error producing message:', error);
//     } finally {
//       await producer.disconnect();
//     }
// };

// const topic = 'topic-1';
// const message = { name: 'Joshua Joel J' };

// produceMessage(topic, message);

// module.exports = { produceMessage };