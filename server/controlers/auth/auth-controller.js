const UserModel = require('../../models/User')
const bycrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const registerUser = async (req, res) =>{
    try{

        const {firstName,lastName,email,password} = req.body 

        const user = await UserModel.findOne({email})
        if(user){
            throw new Error("User with the same email already exists")  
        }
        if(!firstName){
            throw new Error("Please provide your first Name")  
        }
        if(!lastName){
            throw new Error("Please provide your Surname")  
        }
        if(!email){
            throw new Error("email is required")  
        }
        if(!password){
            throw new Error("password is required")  
        }

        const salt = bycrypt.genSaltSync(10)
        const hashPassword = await bycrypt.hashSync(password, salt)

        if(!hashPassword){
            throw new Error('something went wrong')  
        }

        const payload = {
            ...req.body,
            password : hashPassword
        }

        const userData = new UserModel(payload)
        await userData.save()
        
        res.status(201).json({
            success : true,
            error : false,
            message : 'user Created successfully'
        })

    }catch(error){
        console.log(error)
        res.status(401).json({
            success: false,
            message : "error in registering"  
        })
    }

}

const logIn = async(req, res) =>{
    try{

       const {email, password} = req.body 
       
        if(!email){
            throw new Error("Please provide Email")
        }
        if(!password){
            throw new Error("Please provide Password")
        }

        const user =  await UserModel.findOne({email})
        if(!user){
            throw new Error("User does not exist please Sign Up")  
        }

        const comparePassword = await bycrypt.compare(password, user.password)

        if(comparePassword){
           
            const tokenData = {
                userId : user._id,
                firstname : user.firstName,
                lastName : user.lastName,
                email : user.email,
                role : user.role
            }
            const token = await jwt.sign(tokenData,process.env.TOKEN_SECRET,{expiresIn : 60*60*2})
            const tokenOptions = {
                httpOnly : true,
                secure : true,
                sameSite : 'None' 
            }

            res.cookie('token',token,tokenOptions).json({
                message : 'Loging Successfully',                
                success : true,
                error : false,
                user
            })
        }else{
            res.json({
                error:true,
                success:false,
                message : "Wrong password try again "
               })  
        }


    }catch(error){
        console.log(error)
        res.status(401).json({
            success: false,
            message : "error in logging in"  
        })
    }  
}

const logOut = async(req,res)=>{
    try{
  
        res.clearCookie('token',{
            httpOnly : true,
            secure : true,
            sameSite : 'None'  
        }).json({
            success: true,
            message : 'Logged out Successfully'
        })      

    }catch(error){
        console.log(error)
        res.status(401).json({
            success: false,
            message : "error in logging out"  
        })
    }  
}

const authMiddleWare = async(req,res,next)=>{
    try{

        const token = req.cookies.token
        if(!token){
            return res.status(401).json({
                success : false,
                message : 'Unauthorised User' 
            })  
        }

        const decoded = jwt.verify(token,process.env.TOKEN_SECRET)

        req.user = decoded
        next()

    }catch(error){
        console.log(error)
        res.status(401).json({
            success: false,
            message : "error in authorisation"  
        })
    }   
}

module.exports = {registerUser,logIn,logOut,authMiddleWare}