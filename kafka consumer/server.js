const { Kafka } = require('kafkajs');
const kafkaConfig = require('../kafka consumer/config/kafkaConfig');

const consumer = new Kafka({
  clientId: kafkaConfig.clientId,
  brokers: kafkaConfig.brokers,
  retry: {
    maxRetryTime: 5000, // Adjust as needed
    initialRetryTime: 300, // Adjust as needed
    factor: 1, // Adjust as needed
    retries: 5, // Adjust as needed
  },
}).consumer({ groupId: 'group-1' });

const runConsumer = async () => {
  try {
    // Connect to the Kafka cluster
    await consumer.connect();

    // Subscribe to the topic you want to consume
    await consumer.subscribe({ topic: 'topic-1' });

    // Start consuming messages
    await consumer.run({
      eachMessage: async ({ topic, partition, message }) => {
        console.log({
          value: message.value.toString(),
        });

        // Here, you can add your logic to process each consumed message
      },
    });
  } catch (error) {
    console.error('Error in Kafka consumer:', error);
  }
};

// Run the consumer
runConsumer().catch(console.error);

// Optionally, handle shutdown gracefully
process.on('SIGINT', async () => {
  try {
    await consumer.disconnect();
    process.exit(0);
  } catch (err) {
    console.error('Error disconnecting Kafka consumer:', err);
    process.exit(1);
  }
});
