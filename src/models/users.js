const mongoose = require('mongoose');

module.exports = mongoose.model('User',{
    username: String,
    password: String,
    data: Array
});