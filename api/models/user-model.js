const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: [true, 'User email is required field!']
    },
    username: { 
        type: String,
        required: false
    },
    password: { 
        type: String, 
        required: [true, 'User password is required field!'] 
    },
});

module.exports = mongoose.model('User', UserSchema);