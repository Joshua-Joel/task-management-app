const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
    assigner_id: {
        type: mongoose.Types.ObjectId,
        required: true,
    },
    assignee_id:{
        type: mongoose.Types.ObjectId,
        required: true,
    },
    task_name:{
        type: String,
        required: true
    },
    task_desc:{
        type: String,
        required: true
    },
    dead_line:{
        type: Date,
        required: true
    },
    effort:{
        type: Number,
        required: true
    },
    status:{
        type: String,
        required: true
    },
    created_at:{
        type: Date,
        default: Date.now,
        required: true
    },

});


const Task = mongoose.model('tasks', taskSchema);

module.exports = Task;