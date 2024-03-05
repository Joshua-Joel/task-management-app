import dotenv from 'dotenv';
import mongoose from '../../services/db.js';
import User from '../../models/User.js';
import Task from '../../models/Task.js';
// import userService from '../../services/userService';
import cron from 'node-cron';

dotenv.config();

export default cron;
