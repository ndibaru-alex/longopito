const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')
require('dotenv').config()
const router = require('./routes/index')
const connectDB = require('./db')
const bodyParser = require("body-parser")


const app = express()

app.use(
    cors({
        origin : "https://longopito-rac-milimani.onrender.com",
        methods : ["GET", "POST", "DELETE", "PUT"],
        allowedHeaders : [
        "Content-Type",
         "Authorization",
        "Cache-Control",
        "Expires",
        "Pragma", 
        ],
        credentials : true
    })
)

app.use(cookieParser())
app.use(express.json())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api',router)

const PORT = process.env.PORT || 8000

connectDB()
.then(()=>{
    app.listen(PORT, ()=> console.log(`Server running on port ${PORT}`))
})
