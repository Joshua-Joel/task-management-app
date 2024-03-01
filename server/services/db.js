const mongoose = require('mongoose');
const chalk = require('chalk');
const dbUserName = process.env.DB_USER_NAME
const dbPassword = process.env.DB_PASSWORD
const dbHostName = process.env.DB_HOST_NAME
const dbName = process.env.DB_NAME

const databaseUrl = `mongodb+srv://${dbUserName}:${dbPassword}@${dbHostName}/${dbName}`;

mongoose.connect(databaseUrl);
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log(chalk.bold.green(`==> 🛢️  CONNECTED TO MONGODB SERVER 🛢️ <==`));
});

module.exports = mongoose;