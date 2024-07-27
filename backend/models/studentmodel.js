const mongoose=require('mongoose')

const studentSchema = new mongoose.Schema({
    name :{
        type:String
    },
    Rollno:{
        type:String
    },
    year:{
        type:Number
    },
    branch:{
        type:String
    },
    mail:{
        type:String
    },
    admissionNumber:{
        type:Number
    }
})


module.exports = mongoose.model("student", studentSchema);