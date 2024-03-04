module.exports = {
    brokers: ['localhost:9092', 'localhost:9092'],
    clientId: 'task-management-app',
    groupId: 'group-1',
    ssl: true,
    sasl: {
      mechanism: 'plain',
      username: 'joshuajoelj',
      password: 'password123',
    },
  };