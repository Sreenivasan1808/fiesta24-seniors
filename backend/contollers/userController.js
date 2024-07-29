const userModel = require("../models/user");
const studentModel = require("../models/studentmodel");
const soloeventModel=require("../models/soloeventmodel")
const groupevenModel=require("../models/groupevents")
const { encrypt } = require("../crypto-utils");
const { send_mail } = require("../mailer");
const generatePassword = require('generate-password');
const eventModel=require('../models/events')
const Register = async (req, res) => {
  try {
    console.log("Request body:", req.body);

    const studData = await studentModel.findOne({ Rollno: req.body.rollno });
    if (studData == null) {
      return res.status(404).json("No such student available");
    }

    const data = await userModel.findOne({ Rollno: req.body.rollno });
    console.log("User data found:", data);
    if (data != null) {
      return res.status(401).json({ message: "User already exists" });
    }

    const encrypted_password = encrypt(req.body.password);
    console.log("Encrypted password:", encrypted_password);

    const newUser = new userModel({
      Rollno: req.body.rollno,
      password: encrypted_password.content,
      role: "participant",
      detail: studData._id,
      status: "pending",
      events:[]
    });

    console.log("New user object:", newUser);

    const s = await newUser.save();
    console.log("Saved user:", s);
    if (s) {
      return res.status(200).json({
        message: "Registered Successfully",
      });
    }
  } catch (error) {
    console.error("Error during registration:", error);
    if (error.code === 11000) {
      // Handle unique constraint error
      return res.status(409).json({ message: "User with this Rollno already exists" });
    } else {
      return res.status(500).json({
        message: "Registration Failed",
        error: error.message
      });
    }
  }
};

const Login = async (req, res) => {
  try {
    const encrypted_password = encrypt(req.body.password);
    const data = await userModel.findOne({ Rollno: req.body.rollno, password: encrypted_password.content,status:"approved"});
    if (data == null) {
      return res.status(401).json("Invalid rollno or password or not approved");
    }
    return res.status(200).json("Login Successful");
  } catch (error) {
    return res.status(500).json({
      message: "Login Failed",
    });
  }
};

const forgetPassword = async (req, res) => {
  try {
    const rollno = req.body.rollno;
    const available1 = await userModel.findOne({ Rollno: rollno });
    if (available1 != null) {
      const data = await studentModel.findOne({ Rollno: rollno });
      const randomPassword = generatePassword.generate({
        length: 8,
        numbers: true,
        symbols: true,
        uppercase: true,
        lowercase: true,
        excludeSimilarCharacters: true
      });
      console.log(randomPassword);
      const encrypted_password = encrypt(randomPassword);
      const update = await userModel.updateOne({ Rollno: rollno }, { $set: { password: encrypted_password.content } });
      send_mail(data.mail, `Your password has been reset to ${randomPassword}`);
      return res.status(200).json("Success");
    } else {
      return res.status(404).json("No data found");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Password reset failed",
    });
  }
};

const changePassword = async (req, res) => {
  try {
    const current_encrypted = encrypt(req.body.currentpassword);
    const data = await userModel.findOne({ Rollno: req.body.rollno, password: current_encrypted.content });
    if (data == null) {
      return res.status(404).json("Invalid rollno or password");
    } else {
      const new_encrypted = encrypt(req.body.newpassword);
      const update = await userModel.updateOne({ Rollno: req.body.rollno }, { $set: { password: new_encrypted.content } });
      return res.status(200).json("Success");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Password change failed",
    });
  }
};
const registerSoloevent= async(req,res) =>{
  const data = await userModel.findOne({Rollno:req.body.rollno})
  const registeringEvent=req.body.eventname
  const events=data.events
  const flag=1
  for(let i=0;i<events.length;i++){
    const eventTime=await eventModel.find({eventName:req.body.eventName})
    if(eventTime.startTime==events[i].startTime||(eventTime.startTime>events[i].startTime&&eventTime.startTime<events[i].endTime)||(eventTime.endTime>events[i].startTime&&eventTime.endTime<=events[i].endTime)||(events[i].startTime>eventTime.startTime&&events[i].startTime<eventTime.endTime)||(events[i].endTime>eventTime.startTime&&events[i].endTime<=eventTime.endTime)){
      res.status(201).json("cannot participate")
    }
    }
    const newsoloevent = new soloeventModel({
      Rollno:req.body.rollno,
      EventName:registeringEvent
    })
    const s = await newsoloevent.save()
    const update=await userModel.updateOne({Rollno:req.body.rollno})
    res.status(200).json("can participate")
}
const isEventRegistered = async (req,res) => {
  const data = await userModel.updateOne({Rollno:req.query.rollno},{$push:{events:registeringEvent}})
  const events=data.events
  if (req.query.eventName in events){
    res.status(200).json("already registered")
  }
  else{
    res.status(201).json("didn't registered")
  }
}

module.exports = {
  Register: Register,
  login: Login,
  ForgetPass: forgetPassword,
  ChangePass: changePassword,
  IsRegistered:isEventRegistered,
  RegisterSoloEvent:registerSoloevent
};
