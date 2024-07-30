const mongoose=require("mongoose")

const eventSchema=new mongoose.Schema({
    eventName:{
        type:String
    },
    eventType:{
        type:String
    },
    venue:{
        type:String
    },
    startTime:{
        type:String
    },
    endTime:{
        typer:String
    }
})
module.exports=mongoose.model("event",eventSchema)