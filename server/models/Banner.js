const mongoose = require('mongoose')

const bannerSchema = new mongoose.Schema({
    image : String,
    title : String,
    description : String,
    to : String

})

module.exports = mongoose.model('banner',bannerSchema)