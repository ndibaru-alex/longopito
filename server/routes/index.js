const express = require('express')
const router = express.Router()

const {upload} = require('../helpers/cloudinary')
const {registerUser,logIn,logOut,authMiddleWare} = require('../controlers/auth/auth-controller')
const {createBanner,getBanners,updateBanner,deleteBanner,handleImageUpload} = require('../controlers/banner-controller')
const {createToken,stkPush,mpesaCallBack} = require('../controlers/donations-controller')
const {newTeam,fetchTeams,updateTeam,deleteTeamMember} = require('../controlers/team-controller')
const {addMessage,fetchMesssages,deleteMessage} = require('../controlers/messages-controller')
 
//auth routes
router.post('/register',registerUser)
router.post('/login',logIn)
router.post('/logout',logOut)
router.get('/check-auth',authMiddleWare,(req,res)=>{
    const user = req.user
    res.status(200).json({
        success : true,
        message : 'Aunthenticated user',
        user
    })
})

//banner routes
 router.post('/addBanner',createBanner)
 router.get('/banners',getBanners)
 router.delete('/deleteBanner/:id',deleteBanner)
 router.post('/upload-image',upload.single('my_file'),handleImageUpload)
 router.put('/updateBanner/:id',updateBanner)

 //donation routes
 router.post('/stk-push',createToken,stkPush)
 router.post('/mpesa-callback92dhvd',mpesaCallBack)

 //team routes 
 router.post('/addTeam',newTeam)
 router.get('/teams',fetchTeams)
 router.delete('/deleteTeam/:id',deleteTeamMember)
 router.put('/updateTeam/:id',updateTeam)

 //message routes

 router.post('/addMessage',addMessage)
 router.get('/messages',fetchMesssages)
 router.delete('/deleteMessage/:id',deleteMessage)



module.exports = router