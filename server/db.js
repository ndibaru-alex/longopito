const mongoose = require('mongoose')

async function connectDB(){
    try{
     
        await mongoose.connect(process.env.MONGO_DB)
        console.log('connected to donations')

    }catch(error){
        console.log(error)
    }
}

module.exports = connectDB