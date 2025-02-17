const bannerModel = require('../models/Banner')
const {imageUploadUtil} = require('../helpers/cloudinary')

const handleImageUpload = async(req,res)=>{

    const b64 = Buffer.from(req.file.buffer).toString('base64')
    const url = 'data:' + req.file.mimetype + ';base64,' + b64
    const result = await imageUploadUtil(url)

    res.json({
        success : true,
        result
    })


}


const createBanner = async(req,res)=>{
    try{
        const {image,title,description,to} = req.body 

        const bannerData = new bannerModel(req.body)

        await bannerData.save()
        res.status(200).json({
            success : true,
            data : bannerData
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }
}

const getBanners = async (req,res)=>{
    try{

        const banners = await bannerModel.find({})
        res.status(200).json({
            success : true,
            data : banners
        })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }
}

const updateBanner = async(req,res)=>{
    try{  
        const {id} = req.params   
                 
        const updateBanner = await bannerModel.findByIdAndUpdate(id,req.body,
            {new:true})

            if (!updateBanner) {
                return res.status(404).json({
                    message: "Banner not found",
                    success: false,
                    data: null
                });
            }

           res.status(200).json({
           message : 'banner updated successfully',
           success : true,
           data : updateBanner
        })
        
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }
}

const deleteBanner = async(req,res)=>{
    const {id} = req.params 
    
    await bannerModel.findOneAndDelete({_id:id})
    res.status(200).json({
        success : true,
        message : 'banner deleted Succesfully'
    })
}


module.exports = { createBanner,getBanners,updateBanner,deleteBanner,handleImageUpload}