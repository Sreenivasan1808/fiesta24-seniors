const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  admissionNumber: {
    type: Number,
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
  detail: {
    type: mongoose.Types.ObjectId,
    ref: "student",
  },
  status:{
    type:String,
  }
});

module.exports = mongoose.model("user", userSchema);
