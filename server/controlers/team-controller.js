const teamModel = require('../models/team')

const newTeam = async(req,res)=>{
    try{
        const newTeamMember = new teamModel(req.body)
        await newTeamMember.save()
        res.status(200).json({
            success : true,
            data : newTeamMember
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }
    
}

const fetchTeams = async(req,res)=>{
    try{
        const teams = await teamModel.find({})
        res.status(200).json({
            success : true,
            data : teams
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }
}

const updateTeam = async(req,res)=>{
    try{

     const {id} = req.params

     const teamUpdate = await teamModel.findByIdAndUpdate(id,req.body,
        {new:true})
     
     res.status(200).json({
        success : true,
        data : teamUpdate
     })

    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        }) 
    }
}

const deleteTeamMember = async(req,res)=>{
    try{
        const {id} = req.params
        await teamModel.findByIdAndDelete({_id:id})
        res.status(200).json({
            success : true,
            message : 'team member deleted successfully',
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success : false,
            message : 'error'
        })   
    }
}


module.exports= {newTeam,fetchTeams,updateTeam,deleteTeamMember}