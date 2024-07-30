const userModel = require("../models/user");
const studentModel = require("../models/studentmodel");
const soloeventModel = require("../models/soloeventmodel");
const groupeventModel = require("../models/groupevents");
const { encrypt } = require("../crypto-utils");
const { send_mail } = require("../mailer");
const generatePassword = require("generate-password");
const eventModel = require("../models/events");
const jwt = require('jsonwebtoken');
const { verifyRefreshToken, generateTokens } = require('../utils/jwtUtils');

// Refresh Token Endpoint
const refreshToken = (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.sendStatus(401); // No refresh token provided

  try {
    const user = verifyRefreshToken(refreshToken); // Verify refresh token
    const tokens = generateTokens(user); // Generate new tokens
    res.json({
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken
    });
  } catch (err) {
    res.sendStatus(403); // Forbidden if the refresh token is invalid
  }
};

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
      events: [],
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
      return res
        .status(409)
        .json({ message: "User with this Rollno already exists" });
    } else {
      return res.status(500).json({
        message: "Registration Failed",
        error: error.message,
      });
    }
  }
};

const Login = async (req, res) => {
  try {
    const encrypted_password = encrypt(req.body.password);
    const data = await userModel.findOne({
      Rollno: req.body.rollNo,
      password: encrypted_password.content,
      status: "approved",
    });
    console.log(req.body);
    console.log(data);
    if (data == null) {
      return res.status(401).json("Invalid rollno or password or not approved");
    }
    const tokens = generateTokens(data);
    return res.status(200).json({
      message: "Login Successful",
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      role:data.role
    });
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
        excludeSimilarCharacters: true,
      });
      console.log(randomPassword);
      const encrypted_password = encrypt(randomPassword);
      const update = await userModel.updateOne(
        { Rollno: rollno },
        { $set: { password: encrypted_password.content } }
      );
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
    const data = await userModel.findOne({
      Rollno: req.body.rollno,
      password: current_encrypted.content,
    });
    if (data == null) {
      return res.status(404).json("Invalid rollno or password");
    } else {
      const new_encrypted = encrypt(req.body.newpassword);
      const update = await userModel.updateOne(
        { Rollno: req.body.rollno },
        { $set: { password: new_encrypted.content } }
      );
      return res.status(200).json("Success");
    }
  } catch (error) {
    return res.status(500).json({
      message: "Password change failed",
    });
  }
};
const registerSoloevent = async (req, res) => {
  try {
    const data = await userModel.findOne({ Rollno: req.body.rollno });
    const registeringEvent = req.body.eventName;
    const events1 = data.events;
    let flag = 1;
    console.log(flag);
    const eventTime = await eventModel.findOne({
      eventName: req.body.eventName,
    });
    for (let i = 0; i < events1.length; i++) {
      const events = await eventModel.findOne({ eventName: events1[i] });
      console.log(`time:${eventTime}`);
      const existingeventstart = new Date(events.startTime);
      const existingeventend = new Date(events.endTime);
      const neweventstart = new Date(eventTime.startTime);
      const neweventend = new Date(eventTime.endTime);
      if (
        neweventstart.getTime() == existingeventstart.getTime() ||
        (neweventstart.getTime() > existingeventstart.getTime() &&
          neweventstart.getTime() < existingeventend.getTime()) ||
        (neweventend.getTime() > existingeventstart.getTime() &&
          neweventend.getTime() <= existingeventend.getTime()) ||
        (existingeventstart > neweventstart &&
          existingeventstart < neweventend) ||
        (existingeventend > neweventstart && existingeventend <= neweventend)
      ) {
        flag = 0;
        break;
      }
    }
    if (flag == 0) {
      console.log(flag);
      res.status(204).json("cannot participate");
    } else {
      const newsoloevent = new soloeventModel({
        Rollno: req.body.rollno,
        EventName: registeringEvent,
      });
      const s = await newsoloevent.save();
      const data1 = await userModel.updateOne(
        { Rollno: req.body.rollno },
        { $push: { events: registeringEvent } }
      );
      res.status(200).json("can participate");
    }
  } catch (error) {
    console.log(error);
  }
};
const isEventRegistered = async (req, res) => {
  const data = await userModel.findOne({ Rollno: req.user.Rollno });
  console.log(req.user);
  console.log(req.query.eventName);
  console.log(data);
  const events = data.events;
  console.log(events)
  if (events.includes(req.query.eventName)) {
    console.log("hi");
    res.status(200).json("already registered");
  } else {
    res.status(201).json("didn't registered");
  }
};
const registergroupevent = async (req, res) => {
  try {
    let flag = 1;
    const members = req.body.teamMembers;
    const registeringEvent = req.body.eventName;
    console.log(registeringEvent);
    for (let i = 0; i < members.length; i++) {
      const data = await userModel.findOne({ Rollno: members[i] });

      const events1 = data.events;
      console.log(flag);
      const eventTime = await eventModel.findOne({
        eventName: registeringEvent,
      });
      for (let i = 0; i < events1.length; i++) {
        const events = await eventModel.findOne({ eventName: events1[i] });
        console.log(`time:${eventTime}`);
        const existingeventstart = new Date(events.startTime);
        const existingeventend = new Date(events.endTime);
        const neweventstart = new Date(eventTime.startTime);
        const neweventend = new Date(eventTime.endTime);
        if (
          neweventstart.getTime() == existingeventstart.getTime() ||
          (neweventstart.getTime() > existingeventstart.getTime() &&
            neweventstart.getTime() < existingeventend.getTime()) ||
          (neweventend.getTime() > existingeventstart.getTime() &&
            neweventend.getTime() <= existingeventend.getTime()) ||
          (existingeventstart > neweventstart &&
            existingeventstart < neweventend) ||
          (existingeventend > neweventstart && existingeventend <= neweventend)
        ) {
          flag = 0;
          break;
        }
      }
    }
    if (flag == 0) {
      console.log("hi");
      res.status(204).json({ message: "cannot participate" });
    } else {
      const newgroupevent = new groupeventModel({
        teamName: req.body.teamname,
        event: registeringEvent,
        members: members,
        teamLeader: members[0],
      });
      const s = await newgroupevent.save();
      for (let i = 0; i < members.length; i++) {
        const data1 = await userModel.updateOne(
          { Rollno: members[i] },
          { $push: { events: registeringEvent } }
        );
      }
      res.status(200).json("can participate");
    }
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  Register: Register,
  login: Login,
  ForgetPass: forgetPassword,
  ChangePass: changePassword,
  IsRegistered: isEventRegistered,
  RegisterSoloEvent: registerSoloevent,
  RegisterGroupEvent: registergroupevent,
  refreshToken:refreshToken
};
