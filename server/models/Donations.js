const mongoose = require('mongoose')


const donationSchema = new mongoose.Schema({
    donarName :{type: String, default: "Anonymous"},
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: "Pending" },
    merchantRequestId: { type: String }, 
    checkoutRequestId: { type: String },
    transactionDate: { type: String },
    mpesaReceiptNumber: { type: String }
    
    
     
},
{timestamps : true}
)

module.exports = mongoose.model('Donation',donationSchema)