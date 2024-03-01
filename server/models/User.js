const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    user_email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role:{
        type: String,
        required: true
    }
});


const User = mongoose.model('users', userSchema);

module.exports = User;