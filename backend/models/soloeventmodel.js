const mongoose = require('mongoose');
const soloevetSchema = new mongoose.Schema({
    Rollno:{
        type:String
    },
    EventName:{
        type:String
    }
})
module.exports=mongoose.model('soloevent',soloevetSchema)