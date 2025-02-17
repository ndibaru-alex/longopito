const messageModel = require('../models/message');


const addMessage = async(req,res)=>{
    try{

        const createMessage = new messageModel(req.body)
        await createMessage.save()

        res.status(200).json({
            success : true,
            message : 'Message sent successfully'
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }
}

const fetchMesssages = async(req,res)=>{
    try{

        const messages = await messageModel.find({})
        res.status(200).json({
            success : true,
            data : messages
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        })   
    }
}

const deleteMessage = async(req,res)=>{
    try{
        const {id} = req.params
        const message = await messageModel.findByIdAndDelete(id)
        if(!message){
            return res.status(404).json({
                success : false,
                message : 'Message not found'
            })
        }
        res.status(200).json({
            success : true,
            message : 'Message deleted successfully'
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }

}


module.exports = {addMessage,fetchMesssages,deleteMessage}