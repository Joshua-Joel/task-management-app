const chalk = require('chalk');
const app = require('./src/app/app');
const serverPort = process.env.SERVER_PORT;

const server = app.listen(serverPort);
console.log(chalk.bold.green(`==> 💻 SERVER STARTED ON PORT ${serverPort} 💻 <==`));

const shutdown = () => {
  console.log(chalk.bold.red('==> ⛔️ SHUTTING DOWN SERVER ⛔️ <=='));
  server.close();
};

process.once('SIGINT', shutdown);
process.once('SIGTERM', shutdown);






