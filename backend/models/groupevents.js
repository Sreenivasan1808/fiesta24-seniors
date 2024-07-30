const mongoose=require("mongoose")
const groupeventSchema=new mongoose.Schema({
    teamName:{
        type:String
    },
    event:{
        type:String
    },
    members:{
        type:[{type:String}]
    },
    teamLeader:{
        type:String
    }
})
module.exports=mongoose.model('groupevent',groupeventSchema)