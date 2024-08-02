const dotenv = require("dotenv");
const { send_mail } = require("../mailer"); // Adjust the import based on your file structure
const userModel = require("../models/user");
const studentModel = require("../models/studentmodel");
const {excelDownloader}=require("../excel")
const {encrypt,decrypt} = require("../crypto-utils");
const groupevents = require("../models/groupevents");
const axios=require("axios")
dotenv.config();

const accept = async (req, res) => {
  try {
    const result=(await axios.get(`https://erp.mepcoeng.ac.in/StudentService.svc/getstudent/${req.body.Rollno}`)).data
    const participantMail = result.Email;
    // Update the user's status to "approved"
    
    const update = await userModel.updateOne({ Rollno:req.body.Rollno }, { $set: { status: "approved" } });

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
    const result=(await axios.get(`https://erp.mepcoeng.ac.in/StudentService.svc/getstudent/${req.body.Rollno}`)).data
    const participantMail = result.Email;

    // Update the user's status to "rejected"
    const update = await userModel.updateOne({ Rollno:req.body.Rollno }, { $set: { status: "rejected" } });

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
      const data = (await axios.get(`https://erp.mepcoeng.ac.in/StudentService.svc/getstudent/${result[i].Rollno}`)).data
      participantMail = data.Email;
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
const participantpasswordchange= async (req,res)=>{
  try{
    const rollno=req.body.Rollno
    
    const newpassword=encrypt(req.body.newpassword).content
    const data =  await userModel.updateOne({Rollno:rollno,role:"participant"},{$set :{password:newpassword}})
    
    if(data.modifiedCount==1){
      res.status(200).json("update success")
    }
    else
    {
      res.status(201).json("no such data found")
    }
  }
  catch(error)
  {
    console.log(error)
    res.status(500).json({message:"something went wrong",
      error:error
    })
  }
  
}

const dashboard = async (req, res) => {
  const details = await userModel.find({ status: "pending" });

  if (!details || details.length == 0) {
    res.status(204).end();
    return;
  }

  let arr = [];
  for (let i = 0; i < details.length; i++) {
    

    //replace with API call provided by Sir
    const data = (await axios.get(`https://erp.mepcoeng.ac.in/StudentService.svc/getstudent/${req.body.Rollno}`)).data;
    arr.push(data);
  }
 
  if (arr.length == 0) {
    res.status(204).end();
  } else {
    res.status(200).json(arr);
  }
};
const changeMember = async(req,res)=>{
  try{
    
    const members=req.body.teamMembers
    for(let i=0;i<members.length;i++)
      {
        for(let j=i+1;j<members.length;j++)
        {
          if(members[j]==null){ 
            continue
          }
          if(members[j]==members[i]){
            
            res.status(206).json("team members repeated")
            return
          }
        }
      }
    const data=await groupevents.findOne({teamName:req.body.teamName,teamLeader:members[0],EventName:req.body.eventName})
    const oldmembers=data.members
    if(data==null)
    { 
      
      res.status(204).json("Wrong Team Leader")
      return
    }
    else{
      
      for(let i=0;i<members.length;i++){
        if(members[i]==null)
        {
          continue
        }
        const verify= await userModel.findOne({Rollno:members[i]})
        if(verify==null){
          
          console.log("not found")
          res.status(201).json("user not found")
          return
        }
      }
      const update=await groupevents.updateOne({teamName:req.body.teamName,teamLeader:members[0],EventName:req.body.eventName},{members:members})
      for(let i=0;i<oldmembers.length;i++)
      {
        if(members.includes(oldmembers[i]))
        {
          continue
        }
        else{
          
          await userModel.updateOne(
            { Rollno: oldmembers[i] },           // Filter to find the correct user
            { $pull: { events: req.body.eventName } }     // Remove eventName from the events array
          );
        }
          
        
      }
      const uniqueInArray1 = members.filter(value => !oldmembers.includes(value));
          
          for(let i=0;i<uniqueInArray1.length;i++){
            if(uniqueInArray1[i]==null){
              continue
            }
            const newupdata=await userModel.updateOne({Rollno:uniqueInArray1[i]},{events:req.body.eventName})
          }
          console.log("success")
          res.status(200).json("success")
          return
    }
  }
  catch(error){
    console.log(error)
    res.status(208).json("something went wrong")
    return
  }
}
const getMembers = async(req,res) => {
  try{
    const data=await groupevents.findOne({EventName:req.query.eventName,teamLeader:req.query.Rollno})
    if(data==null){
      res.status(201).json("Invalid event Name or Team Leader")
    }
    else{
      res.status(200).json({
        teamName:data.teamName,
        teamMembers:data.members
      })
    }
  }
  catch(error){

  }
}

module.exports = {
  Accept: accept,
  Acceptall: acceptall,
  Reject: reject,
  Dashboard: dashboard,
  participantpasswordchange:participantpasswordchange,
  changeMember:changeMember,
  getMembers:getMembers
};
