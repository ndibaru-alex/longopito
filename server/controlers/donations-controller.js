const donationModel = require('../models/Donations')
const axios = require('axios')


const consumerKey = process.env.Consumer_Key
const consumerSecret = process.env.Consumer_Secret
const passkey = process.env.Passkey
const shortCode = process.env.ShortCode
const callbackUrl = 'http://localhost:8000/api/mpesa-callback'

const createToken = async(req,res,next)=>{
    try{
        const auth = Buffer.from(`${consumerKey}:${consumerSecret}`).toString('base64')
        const {data} = await axios.get('https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials',
            {headers:{
                Authorization : `Basic ${auth}`
            }}
        )
        req.token = data.access_token
        next()
    }catch(error){
        console.error("Token Generation Error:", error.message);
        res.status(400).json({ error: error.message }); 
 
    }
}

const stkPush = async(req,res)=>{
    try{
        const {phone,amount,donarName}= req.body 

        if(!phone || !amount){
            return res.status(400).json({error : 'Phone and amount are required'})
        }

        const formatedPhone = `254${phone.substring(1)}`
        const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, "").slice(0, 14)
        const password = Buffer.from(`${shortCode}${passkey}${timestamp}`).toString('base64')

        const payload = {    
            "BusinessShortCode": shortCode,    
            "Password": password,    
            "Timestamp":timestamp,    
            "TransactionType": "CustomerPayBillOnline",    
            "Amount": amount,    
            "PartyA":formatedPhone,    
            "PartyB":shortCode,    
            "PhoneNumber":formatedPhone,    
            "CallBackURL": "https://8034-102-0-5-44.ngrok-free.app/api/mpesa-callback92dhvd",   
            "AccountReference":"Mpesa Donations",    
            "TransactionDesc":"Donation Stk Push"
         }       


         const {data} = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest',
            payload,
            {headers : {Authorization: `Bearer ${req.token}`}}
         )

         console.log('callbackData',data)
         const newDonation = new donationModel({
            donarName: donarName || "Anonymous",
            phone: formatedPhone,
            amount,
            merchantRequestId: data.MerchantRequestID,           
            status: "Pending",
         })

         await newDonation.save()
         res.status(200).json({
            success : true,
            message : 'stk-push initiated',
            transaction : newDonation
         })


    }catch(error){
        console.error("STK Push Error:", error.message);
        res.status(400).json({ error: error.message });
    }
}


const mpesaCallBack = async (req, res) => {
    try {
      console.log("🛠 Raw Callback Data:", JSON.stringify(req.body, null, 2));
  
      // If the request body is empty, simply respond with 200 OK.
      if (!req.body || Object.keys(req.body).length === 0) {
        console.warn("⚠️ Received an empty callback. Ignoring...");
        return res.status(200).json({ message: "Empty callback received" });
      }
  
      // Ensure that the expected structure exists.
      if (!req.body.Body || !req.body.Body.stkCallback) {
        console.error("❌ Invalid Callback Data:", req.body);
        return res.status(400).json({ error: "Invalid callback structure received" });
      }
  
      // Extract the stkCallback from the request body.
      const callbackData = await req.body.Body.stkCallback;
      console.log("✅ Extracted Callback Data:", JSON.stringify(callbackData, null, 2));
  
      const { MerchantRequestID, CheckoutRequestID, ResultCode, CallbackMetadata } = callbackData;
  
      // If MerchantRequestID is missing, log the error and return.
      if (!MerchantRequestID) {
        console.error("❌ MerchantRequestID is missing in callback");
        return res.status(400).json({ error: "MerchantRequestID missing" });
      }
  
      // Default values for metadata (in case CallbackMetadata is not provided)
      let amount = 0,
        mpesaReceiptNumber = null,
        transactionDate = null,
        phoneNumber = null;
  
      if (CallbackMetadata && Array.isArray(CallbackMetadata.Item)) {
        CallbackMetadata.Item.forEach(item => {
          switch (item.Name) {
            case "Amount":
              amount = item.Value;
              break;
            case "MpesaReceiptNumber":
              mpesaReceiptNumber = item.Value;
              break;
            case "TransactionDate":
              transactionDate = item.Value;
              break;
            case "PhoneNumber":
              phoneNumber = item.Value;
              break;
          }
        });
      }
  
      console.log("🔹 Parsed Callback Values:", { amount, mpesaReceiptNumber, transactionDate, phoneNumber });
  
      // Look up the donation by MerchantRequestID
      const existingDonation = await donationModel.findOne({ merchantRequestId: MerchantRequestID });
  
      if (!existingDonation) {
        console.warn("⚠️ Transaction not found for update. Possible mismatch in MerchantRequestID.");
        return res.status(404).json({ error: "Transaction not found", merchantRequestId: MerchantRequestID });
      }
  
      // Determine status based on ResultCode
      const status = ResultCode === 0 ? "completed" : "failed";
  
      // Update the donation record
      const updatedDonation = await donationModel.findOneAndUpdate(
        { merchantRequestId: MerchantRequestID },
        { 
          status, 
          checkoutRequestId: CheckoutRequestID, 
          amount, 
          transactionDate, 
          phoneNumber, 
          mpesaReceiptNumber 
        },
        { new: true }
      );
  
      return res.status(200).json({
        message: "Callback processed successfully",
        transaction: updatedDonation,
        success: true
      });
  
    } catch (error) {
      console.error("❌ Callback Processing Error:", error.message);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };
  




module.exports = {createToken,stkPush,mpesaCallBack}



