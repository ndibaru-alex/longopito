const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,        
    },
    password: {
        type: String,
        required: [true, 'Password is required']   
        
    },
    role: {
        type: String,        
        trim: true,
        default : 'user'
    },

},
{timestamps : true}
)

const User = mongoose.model('User',UserSchema)

module.exports = User