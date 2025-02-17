const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    fullName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        trim: true,
        required: true,
    },
    subject: {
        type: String,
        trim: true,
    },
    message :{
        type : String,
        trim: true,
        required : true
    }
})

module.exports = mongoose.model('Message',messageSchema)
