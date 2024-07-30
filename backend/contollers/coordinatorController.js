const dotenv = require("dotenv");
const { send_mail } = require("../mailer"); // Adjust the import based on your file structure
const userModel = require("../models/user");
const studentModel = require("../models/studentmodel");
const {excelDownloader}=require("../excel")
dotenv.config();

const accept = async (req, res) => {
  try {
    const participantMail = req.body.mail;
    console.log(participantMail);
    // Update the user's status to "approved"
    const result = await studentModel.findOne({ mail: participantMail });
    const update = await userModel.updateOne({ detail: result._id }, { $set: { status: "approved" } });
    console.log(result._id);

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send an approval email
    const message =
      "Dear participant, your registration has been approved by the coordinator";
    send_mail(participantMail, message);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Acceptance failed" });
  }
};

const reject = async (req, res) => {
  try {
    const participantMail = req.body.mail;
    const result = await studentModel.findOne({ mail: participantMail });

    // Update the user's status to "rejected"
    const update = await userModel.updateOne({ detail: result._id }, { $set: { status: "rejected" } });

    if (!result) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send a rejection email
    const message =
      "Dear participant, your registration has been rejected by the coordinator";
    send_mail(participantMail, message);

    res.status(200).json({ message: "Success" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Rejection failed" });
  }
};

const acceptall = async (req, res) => {
  try {
    // Update all users' statuses to "approved"
    const result = await userModel.find({ status: { $eq: "pending" } });

    const message = 'Dear participant, your registration has been approved by the coordinator';
    for (let i = 0; i < result.length; i++) {
      const data = await studentModel.findOne({ Rollno: result[i].Rollno });
      participantMail = data.mail;
      const update = await userModel.updateMany(
        { Rollno: result[i].Rollno }, // Update only those who are not already approved
        { $set: { status: "approved" } }
      );

      send_mail(participantMail, message);
    }

    // Fetch updated user emails to send approval emails
    // const users = await userModel.find({ status: "approved" }, "mail");

    // users.forEach((user) => {
    //   send_mail(
    //     user.mail,
    //     "Dear participant, your registration has been approved by the coordinator"
    //   );
    // });

    res.status(200).json({ message: "All users approved and notified" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Acceptance failed" });
  }
};

const dashboard = async (req, res) => {
  const details = await userModel.find({ status: "pending" });

  if (!details || details.length == 0) {
    res.status(204).end();
    return;
  }

  let arr = [];
  for (let i = 0; i < details.length; i++) {
    // console.log(details[i].detail)

    //replace with API call provided by Sir
    const data = await studentModel.findOne({ _id: details[i].detail });
    arr.push(data);
  }
  console.log(arr);
  if (arr.length == 0) {
    res.status(204).end();
  } else {
    res.status(200).json(arr);
  }
};

module.exports = {
  Accept: accept,
  Acceptall: acceptall,
  Reject: reject,
  Dashboard: dashboard
};
