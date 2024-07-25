const userModel = require("../models/users")
const {encrypt, decrypt} = require("../crypto-utils")

const Register = async(req,res) => {
        try {
            const data = await userModel.findOne({ admissionNumber : req.body.admissionNumber})
            if (data!=null){
                res.status(401).json({ message : "User already exist "});
            }
            encrypted_password=encrypt(req.bode.password)
            const newUser = new userModel({
                admissionNumber : req.body.admissionNumber,
                password : encrypted_password.content,
                role : "participant"
            });
            const s = await newUser.save();
            console.log(s);
            if (s) {
                res.status(200).json({
                message: "Registered Successfully",
                });
            }
        }
        catch (error) {
            res.status(500).json({
              message: "Registration Failed",
            });
          }
};

const login = async (req, res) => {
    try{
        const encrypted_password=encrypt(req.body.password);
        const data = await userModel.findOne({ admissionNumber : req.body.admissionNumber,password : encrypted_password.content})
        if(data==null){
            res.status(401).json("Invalid admission number or password")
        }
        res.status(200).json("Login Successful")
    }
    catch (error) {
        res.status(500).json({
          message: "Login Failed",
        });
    }

}