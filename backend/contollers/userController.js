const userModel = require("../models/user");
const studentModel = require("../models/studentmodel");
const { encrypt } = require("../crypto-utils");
const { send_mail } = require("../mailer");
const generatePassword = require('generate-password');

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
      status: "pending"
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
    const data = await userModel.findOne({ Rollno: req.body.rollno, password: encrypted_password.content });
    if (data == null) {
      return res.status(401).json("Invalid rollno or password");
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

module.exports = {
  Register: Register,
  login: Login,
  ForgetPass: forgetPassword,
  ChangePass: changePassword
};
