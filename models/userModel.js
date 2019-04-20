const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
    name:{
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: String,
        default: Date.now
    }
});

const User = mongoose.model('users', UserSchema); // DB에 users를 생성하여 그 안에 UserSchema를 넣음
module.exports = User;

//module.exports = User = mongoose.model('users', UserSchema); <- 이렇게도 가능