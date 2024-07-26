const dotenv=require('dotenv')
const mailer=require('../mailer')
dotenv.config()
const accept = async (req,res) => {
    try{
        participantMail = req,body.mail
        message='Dear participant your registration have been approved by the coordinator'
        mailer(participantMail,message)
        res.status(200).json({
            message:'Success'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: 'acceptance failed'
        })

    }

}
const reject = async (req,res) => {
    try{
        participantMail = req,body.mail
        message='Dear participant your registration have been rejected by the coordinator'
        mailer(participantMail,message)
        res.status(200).json({
            message:'Success'})
    }
    catch(error){
        console.log(error)
        res.status(500).json({
            message: 'Rejection failed'
        })

    }

}
