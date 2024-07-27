const userModel = require("../models/user");
const studentModel = require("../models/studentmodel");
const { encrypt, decrypt } = require("../crypto-utils");

const Register = async (req, res) => {
  try {
    const studData = await studentModel.findOne({ admissionNumber: req.body.admissionNumber });
    const data = await userModel.findOne({ admissionNumber: req.body.admissionNumber });
    console.log(data, studData);
    if (data != null) {
      res.status(401).json({ message: "User already exists" });
      return;
    }
    const encrypted_password = encrypt(req.body.password);
    const newUser = new userModel({
      admissionNumber: req.body.admissionNumber,
      password: encrypted_password.content,
      role: "participant",
      detail: studData._id ,
      status: "pending"
    });
    const s = await newUser.save();
    console.log(s);
    if (s) {
      res.status(200).json({
        message: "Registered Successfully",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "Registration Failed",
    });
  }
};

const Login = async (req, res) => {
  try {
    const encrypted_password = encrypt(req.body.password);
    const data = await userModel.findOne({ admissionNumber: req.body.admissionNumber, password: encrypted_password.content });
    if (data == null) {
      res.status(401).json("Invalid admission number or password");
      return;
    }
    res.status(200).json("Login Successful");
  } catch (error) {
    res.status(500).json({
      message: "Login Failed",
    });
  }
};

module.exports = {
  Register: Register,
  login: Login
};
