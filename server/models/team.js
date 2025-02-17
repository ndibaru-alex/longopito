const mongoose = require('mongoose')

const TeamSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: true
    },
    title : {
        type : String,
        required : true
    },
    image : {
        type : String,
        required : true
    }
})

module.exports = mongoose.model('Team',TeamSchema)