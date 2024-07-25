const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    admissionNumber:{
      type:Number,
      unique:true,
      required:true,
    },
    password:{
      type:String,
      required:true,
    },
    name : {
      type : String,
    },
    mail : {
      type : String,
    },
    year :{
      type : Number
    },
    branch : {
      type : String
    },
    role : {
      type : String
    },
    approvalStatus:{
      type : String
    }
  })
  
  module.exports = mongoose.model("User", userSchema);