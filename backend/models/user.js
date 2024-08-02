const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  Rollno: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
  },
  status:{
    type:String,
  },
  events:{
    type:[{type:String}]
  } 
});

module.exports = mongoose.model("user", userSchema);
